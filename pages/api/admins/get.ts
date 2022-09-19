import type { NextApiRequest, NextApiResponse } from 'next'
import Admin from '../../../typescript/interfaces/admin'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import db from '../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Admin[]>
) {
  
  const { orgId } = req.query;

  if (!orgId) {
    // 400: Bad Request
    return res.status(400).end();
  }

  // get all admins
  const q = query(collection(db, `users/${orgId}/admins`), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const admins: Admin[] = [];

  querySnapshot.forEach((doc) => {
    admins.push({
      id: doc.id,
      orgId: orgId,
      ...doc.data()
    } as Admin);
  });

  // 200: OK
  return res.status(200).json(admins);
  
}
