import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import PdfKit from 'pdfkit'
import nodeMailer from 'nodemailer'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { fullname, pin, orgId, email, team } = req.body

  // error handling
  if (!fullname || !pin || !orgId || !email || !team) {
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
  
  // first encrypt the pdf
  const editedName = fullname.replace(' ', '').toLowerCase();
  var pdfDoc = new PdfKit({ userPassword: editedName, ownerPassword: editedName });

  var stream = fs.createWriteStream('./credentials.pdf');
  pdfDoc.pipe(stream);
  pdfDoc.text(
    `${fullname} | ${data.name}\n\npin = ${pin}\nkey = ${data.credentials.key}`
  );
  pdfDoc.end();
  
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
    to: email, // list of receivers
    subject: 'Your Login Details', // Subject line
    html: 
    `
      <h2>Welcome to Owl, ${fullname}!</h2>
      <hr></hr>
      <p>You have been added to <i>${data.name}'s</i> ${team} team.</p>
      <p>You can find your login credentials in the encrypted pdf file attatched to this email.</p>
      <p>Password to the pdf file is: <u>${editedName}</u>.<p>
    `, // html body
    attachments:[{
      // file on disk as an attachment
      filename: 'credentials.pdf',
      path: './credentials.pdf' // stream this file
    }],
  });

  if (info.accepted.length !== 1) {
    // 500: Internal Server Error
    return res.status(500).end();
  }
  
  res.status(201).end();
  
}
