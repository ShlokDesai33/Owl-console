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

  const { pin, key } = req.body as { pin: string, key: string };
  // find an org using the key
  const orgQuery = query(collection(db, 'users'), where('credentials.key', '==', key));
  const orgQSnapshot = await getDocs(orgQuery);
  
  // error handling
  if (orgQSnapshot.docs.length !== 1) {
    // org not found
    // 401: Unauthorized
    return res.status(401).end();
  }

  const orgDoc = orgQSnapshot.docs[0];

  // check if user is a root user
  if (orgDoc.data().credentials.pin === pin) {
    const JWT_TOKEN = await new SignJWT({ })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(orgDoc.id)
      .setIssuedAt()
      .setIssuer('owl-console')
      .sign(JWT_SECRET);

    res.setHeader('JWT-Token', JWT_TOKEN);
    return res.status(200).end();
  }
  // user could be an admin
  const adminQuery = query(collection(db, `users/${orgDoc.id}/admins`), where('credentials.pin', '==', pin));
  const adminQSnapshot = await getDocs(adminQuery);

  // error handling
  if (adminQSnapshot.docs.length !== 1) {
    // admin not found
    // 401: Unauthorized
    return res.status(401).end();
  }

  // user found with the pin
  const JWT_TOKEN = await new SignJWT({ org: orgDoc.id })
  .setProtectedHeader({ alg: 'HS256' })
  .setSubject(adminQSnapshot.docs[0].id)
  .setIssuedAt()
  .setIssuer('owl-console')
  .sign(JWT_SECRET);

  res.setHeader('JWT-Token', JWT_TOKEN);
  return res.status(200).end();
}
