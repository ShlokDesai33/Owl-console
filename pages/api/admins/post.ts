import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import db from '../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { fullname, email, cell, team, orgId } = req.body;
  // create unique personal id number for new admin
  const pin = randomBytes(16).toString('hex');

  try {
    await addDoc(collection(db, `users/${orgId}/admins`), {
      fullname,
      email,
      cell,
      team,
      pin,
      createdAt: serverTimestamp(),
    });
  }
  catch {
    // 500: Internal Server Error
    res.status(500).end();
  }

  // send email

  res.setHeader('pin', pin);
  res.status(201).end();

}