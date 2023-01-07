import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { collection, query, startAfter, getDocs, limit, orderBy, Query, DocumentData, Timestamp } from "firebase/firestore"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {

  // createdAt object contains seconds and nanoseconds
  const { secs, nanos, orgID, adminID } = req.query

  if (!orgID || !adminID) {
    return res.status(400).end();
  }

  const arr: any[] = [];
  let q: Query<DocumentData>;

  // check if we have a createdAt and query firestore
  if (secs && nanos) {
    // timestamp exits, fetch posts after that timestamp
    const timestamp = new Timestamp(Number(secs), Number(nanos))
    q = query(collection(db, `users/${orgID}/admins/${adminID}/bookings`),
      orderBy('createdAt', 'desc'),
      startAfter(timestamp),
      limit(5)
    );
  } else {
    // no createdAt, fetch the first 10 posts
    q = query(collection(db, `users/${orgID}/admins/${adminID}/bookings`),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
  }
  const docs = await getDocs(q);
  
  // construct response obj
  docs.forEach(doc => {
    arr.push({ id: doc.id, ...doc.data() });
  })

  res.status(200).json(arr);
}