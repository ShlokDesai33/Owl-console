import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, deleteDoc } from 'firebase/firestore'
import db from '../../../firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { orgId, adminId } = req.body;

  if (!orgId || !adminId) {
    // 400: Bad Request
    return res.status(400).end();
  }

  try {
    // delete admin
    await deleteDoc(doc(db, `users/${orgId}/admins`, adminId));
    return res.status(201).end();
  }
  catch {
    // 500: Internal Server Error
    return res.status(500).end();
  }

}
