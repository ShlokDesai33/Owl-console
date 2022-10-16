import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, DocumentData, getDocs, query, orderBy } from 'firebase/firestore'
import db from '../../../../firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id, col } = req.query
  const fields: DocumentData[] = []

  const q = query(collection(db, `resources/${id}/${col}`), orderBy('content'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    fields.push(doc.data().content)
  });

  if (fields.length) {
    res.status(200).json(fields);
  }
  else {
    res.status(404).end()
  }
  
}
