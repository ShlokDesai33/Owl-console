// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// const { runTransaction, doc } = require('firebase/firestore')

// module.exports.generateCredentials = async (orgId) => {
//   const pin = crypto.randomBytes(16).toString('hex');
//   const key = crypto.randomBytes(16).toString('hex');

//   // Create a reference to the org doc.
//   const docRef = doc(db, 'users', orgId);

//   // update the org with the key and password
//   try {
//     await runTransaction(db, async (transaction) => {
//       const docSnapcshot = await transaction.get(docRef);
//       if (!docSnapcshot.exists()) {
//         throw "Document does not exist!";
//       }

//       // create the updated credentials object
//       const credentials = {
//         pin,
//         key
//       }

//       transaction.update(docRef, { credentials });
//     });
//     console.log("New credentials successfully generated!");
//   } catch (e) {
//     console.log("Generation failed: ", e);
//   }
// }