import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import nodeMailer from 'nodemailer'
import { format } from 'date-fns';

let transport = nodeMailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  auth: {
    user: 'no-reply@owlapp.in',
    pass: process.env.EMAIL_PASSWORD,
  },
});

function parseBookingStatus(type: string) {
  switch (type) {
    case 'pending':
      return 'Pending Approval';
    case 'approved':
      return 'Approved';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return '';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const body = req.body;

  if (!body) {
    return res.status(400).end();
  }

  let message = "";

  try {
    if (body.update.selectedSlot) {
      const date = new Date(body.update.selectedSlot + "T00:00:00");
      await updateDoc(doc(db, `users/${body.orgID}/admins/${body.adminID}/bookings`, body.id), { selectedSlot: date });
      await updateDoc(doc(db, `users/${body.userID}/bookings`, body.id),  { selectedSlot: date });
      await updateDoc(doc(db, `resources/${body.productID}/bookings`, body.id),  { selectedSlot: date });

      message = `Your slot time has been updated to ${format(date, "MMMM dd, yyyy")}.`;
    }
    else if (body.update.status) {
      await updateDoc(doc(db, `users/${body.orgID}/admins/${body.adminID}/bookings`, body.id), body.update);
      await updateDoc(doc(db, `users/${body.userID}/bookings`, body.id), body.update);

      message = `Your booking status has been updated to '${parseBookingStatus(body.update.status)}'.`;
    }
    else {
      throw new Error("Invalid update type.");
    }
    res.status(201).end();
  }
  catch (error) {
    return res.status(500).end();
  }

  const docSnap = await getDoc(doc(db, 'users', body.userID));

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    return res.status(404).end();
  }

  // get org name and key
  const data = docSnap.data();

  transport.sendMail({
    from: '"Owl" no-reply@owlapp.in', // sender address
    to: data.email, // list of receivers
    subject: `Update on booking @${body.id}.`, // Subject line
    html:
    `
      <h4>${message}</h4>
      <hr></hr>
      <p>If this is unexpected, please contact the admin directly through their email/cellphone.</p>
    `, // html body
  });

}