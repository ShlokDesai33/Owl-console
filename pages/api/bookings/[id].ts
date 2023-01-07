import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { getDoc, doc } from "firebase/firestore"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // createdAt object contains seconds and nanoseconds
  const { id, orgID, adminID } = req.query

  if (!id || !orgID || !adminID) {
    return res.status(400).end();
  }

  const docSnap = await getDoc(doc(db, `users/${orgID}/admins/${adminID}/bookings/${id}`));

  if (docSnap.exists()) {
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } else {
    // doc.data() will be undefined in this case
    res.status(404).end();
  }
}