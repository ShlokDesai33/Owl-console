import type { NextApiRequest, NextApiResponse } from 'next'
import nodeMailer from 'nodemailer'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { name, pin, orgId, email, team } = req.body

  // error handling
  if (!name || !pin || !orgId || !email || !team) {
    // 400: Bad Request
    return res.status(400).end();
  }

  const docSnap = await getDoc(doc(db, 'users', orgId));

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    return res.status(404).end();
  }

  // get org name and key
  const data = docSnap.data();
  
  // send email asynchronously
  let transport = nodeMailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    auth: {
      user: 'no-reply@owlapp.in',
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  let info = await transport.sendMail({
    from: '"Owl" no-reply@owlapp.in', // sender address
    to: decodeURIComponent(email), // list of receivers
    subject: 'Your Login Details', // Subject line
    html:
    `
      <h2>Welcome to Owl, ${name}!</h2>
      <hr></hr>
      <p>You have been added to <i>${data.name}'s</i> ${team} team.</p>
      <p>Your login credentials are given below. Please DO NOT share your log credentials with anybody.</p>
      <p>Pin: <u>${pin}</u>.<p>
      <p>Key: <u>${data.credentials.key}</u>.<p>
    `, // html body
  });

  if (info.accepted.length !== 1) {
    // 500: Internal Server Error
    return res.status(500).end();
  }
  
  res.status(201).end();
  
}
