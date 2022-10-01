import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id } = req.query

  const docSnap = await getDoc(doc(db, 'resources', id as string));

  if (docSnap.exists()) {
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } else {
    // doc.data() will be undefined in this case
    res.status(404).end();
  }
  
}
