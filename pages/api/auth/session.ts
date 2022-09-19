import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtVerify } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import Cookies from 'cookies'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../firebase'
import Organization from '../../../typescript/interfaces/organization'

// convert string to KeyObject
const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organization | { error: any }>
) {
  // create a cookie instance to configure cookies
  const cookies = new Cookies(req, res);
  // get the auth cookie if it exists
  const token = cookies.get('auth-token');

  if (token) {
    try {
      // verify token signature
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        issuer: 'owl-console', // iss
      });

      const orgDoc = await getDoc(doc(db, `users/${payload.org || payload.sub}`));

      if (orgDoc.exists()) {
        const org = orgDoc.data();
        // check if user is admin
        if (payload.org) {
          const adminDoc = await getDoc(doc(db, `users/${payload.org}/admins/${payload.sub}`));
  
          if (adminDoc.exists()) {
            const admin = adminDoc.data();

            return res.status(200).json({
              isAdmin: true,
              // org details
              orgId: payload.org as string,
              orgName: org.name,
              orgLogo: org.logo,
              orgKey: org.credentials.key,
              // admin details
              adminId: payload.sub as string,
              adminName: admin.fullname,
              adminEmail: admin.email,
              adminCell: admin.cell,
              adminTeam: admin.team,
            });
          }
        }
        // user is root user
        return res.status(200).json({
          isRoot: true,
          // org details
          orgId: payload.sub as string,
          orgName: org.name,
          orgLogo: org.logo,
          orgKey: org.credentials.key,
        });
      } else {
        // doc.data() will be undefined in this case
        // fake token
        // instruct browser to delete auth cookie
        cookies.set('auth-token', '', {
          maxAge: 0,
        });
        // 309: Redirect to login page
        return res.status(309).json({ error: 'Org does not exist.' });
      }
    } catch (error: any) {
      // token has been tempered with
      // instruct browser to delete auth cookie
      cookies.set('auth-token', '', {
        maxAge: 0,
      });
      // error.claim and error.code are defined if iss or aud are invalid
      // error.code is defined if signature is invalid

      // 309: Redirect to login page
      return res.status(309).json({ error: error.code });
    }
  } else {
    // 309: Redirect to login page
    res.status(309).json({ error: 'Token absent' });
  }
}
