import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../../../firebase'

const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { pin } = req.body;
  // Create a query against the /users collection.
  const q = query(collection(db, 'users'), where('credentials.pin', '==', pin));

  const querySnapshot = await getDocs(q);
  // there is never going to be more than one doc
  if (querySnapshot.docs.length === 1) {
    // doc.data() is never undefined for query doc snapshots
    querySnapshot.forEach(async (doc) => {
      // user authenticated; create org's auth token
      const JWT_TOKEN = await new SignJWT({ })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(doc.id)
        .setIssuedAt()
        .setIssuer('owl-console')
        .sign(JWT_SECRET);

      res.setHeader('JWT-Token', JWT_TOKEN);
      res.status(200).end();
    });
  }
  else if (querySnapshot.docs.length === 0) {
    // 401: Unauthorized
    return res.status(401).end();
  }
  else {
    // impossible since one key can only be linked to one org
    return res.status(500).end();
  }
}
