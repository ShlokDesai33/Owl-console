import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import nodeMailer from 'nodemailer'
import { doc, getDoc } from 'firebase/firestore'

let transport = nodeMailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  auth: {
    user: 'no-reply@owlapp.in',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const body = req.body
  const docSnap = await getDoc(doc(db, 'users', body.userID));

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    return res.status(404).end();
  }

  // get org name and key
  const data = docSnap.data();

  let info = await transport.sendMail({
    from: '"Owl" no-reply@owlapp.in', // sender address
    to: data.email, // list of receivers
    subject: `${body.adminName} has sent you a new message.`, // Subject line
    html:
    `
      <h4>${body.message}</h4>
      <hr></hr>
      <p>To reply to this message, please contact the admin directly through their email/cellphone.</p>
    `, // html body
  });

  if (info.accepted.length !== 1) {
    // 500: Internal Server Error
    return res.status(500).end();
  }

  res.status(200).end();
}