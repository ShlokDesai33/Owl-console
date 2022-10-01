import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, setDoc, serverTimestamp, doc } from 'firebase/firestore'
import db from '../../../firebase'
import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
  region: 'ap-south-1',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    // 405: Method Not Allowed
    return res.status(405).end();
  }
  
  const body = req.body;

  // error handling
  if (!body || !body.imageType.startsWith('image/')) {
    // 400: Bad Request
    return res.status(400).end();
  }
  
  try {
    // generate a unique id for the resource
    const docRef = doc(collection(db, 'resources'));

    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: docRef.id,
      Expires: 600,
      ContentType: body.imageType,
    };

    const url = new URL(await s3.getSignedUrlPromise('putObject', fileParams));

    // post the resource to the database
    const price = Number(body.price) > 0 ? Number(body.price) : 0;
    const facultyDiscount = Number(body.facultyDiscount) > 0 ? Number(body.facultyDiscount) : 0;

    // calculate the prices
    const facultyPrice = price - (price * facultyDiscount / 100);

    await setDoc(docRef, {
      // resouce info
      name: body.name,
      description: body.description,
      status: body.status,
      image: (url.origin + url.pathname),
      // creator of the resource
      org: {
        // org details
        id: body.orgId,
        name: body.orgName,
        logo: body.orgLogo,
      },
      // org's admin details
      admin: {
        name: body.adminName,
        // admin contact details
        email: body.adminEmail,
        cell: body.adminCell
      },
      // variable pricing
      prices: {
        metric: body.priceMetric,
        industry: price,
        faculty: facultyPrice,
      },
      // custom fields
      fields: {
        applications: 0,
        limitations: 0,
        // fields are named this way to allows easy formatting
        sample_requirements: 0,
        shipping_instructions: 0,
        custom_info: 0,
        custom_input: 0
      },
      address: "TODO",
      // timestamp
      createdAt: serverTimestamp(),
    });

    res.status(201).json({ url: url.href, imageName: docRef.id });
  }
  catch {
    // 500: Internal Server Error
    res.status(500).end();
  }
  
}
