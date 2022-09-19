import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import db from '../../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { fullname, email, cell, team, orgId } = req.body;

  // error handling
  if (!fullname || !email || !cell || !team || !orgId) {
    // 400: Bad Request
    return res.status(400).end();
  }

  // create unique personal identification number for new admin
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
    return res.status(500).end();
  }

  // send email asynchronously
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://owl-console.vercel.app';
  fetch(`${url}/api/admins/post/email`, {
    method: 'POST',
    body: JSON.stringify(
      {
        fullname,
        email,
        team,
        orgId,
        pin
      }
    ),
    headers: { 'Content-Type': 'application/json' }
  });

  res.setHeader('pin', pin);
  res.status(201).end();

}