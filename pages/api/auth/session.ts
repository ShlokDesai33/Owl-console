import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtVerify } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import Cookies from 'cookies'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../firebase'

// convert string to KeyObject
const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create a cookie instance to configure cookies
  const cookies = new Cookies(req, res, { secure: true });
  // get the auth cookie if it exists
  const token = cookies.get('auth-token');

  if (token) {
    try {
      // verify token signature
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        issuer: 'owl-console', // iss
      });
      // user is authenticated
      // get user data from firestore
      const orgDoc = await getDoc(doc(db, 'users', payload.sub as string));
      // error handling
      if (orgDoc.exists()) {
        const data = orgDoc.data();
        // send org data back to client
        return res.status(200).json({
          id: orgDoc.id,
          name: data.name,
          logo: data.logo
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
