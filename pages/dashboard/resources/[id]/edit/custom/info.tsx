import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { useState } from 'react'
import InfoField from '../../../../../../components/resources/post/fields/info'
import DynamicHeader from '../../../../../../components/resources/view/dynamic_header'
import { writeBatch, doc, collection, updateDoc } from 'firebase/firestore'
import db from '../../../../../../firebase'
import Spinner from '../../../../../../components/lib/spinner'
import { Bug } from 'phosphor-react'

type CustomInfoField = {
  // name of field
  name: string
  content: string[]
}

type Props = {
  id: string
  param: string
  resState: 'default' | 'error'
}

const PostInputFields = ({ id, resState }: Props) => {
  const [customFields, setCustomFields] = useState<CustomInfoField[]>([]);
  const [state, setState] = useState<'default' | 'error' | 'loading'>(resState);

  switch (state) {
    case 'loading':
      return (
        <>
          <Head>
            <title>Create Resources | Instrumus Console</title>
          </Head>
  
          <div className="flex grow place-items-center justify-center">
            <Spinner />
          </div>
        </>
      )

    case 'error':
      return (
        <>
          <Head>
            <title>Create Resources | Instrumus Console</title>
          </Head>
    
          <div className="flex grow place-items-center justify-center">
            <div className="flex items-center gap-x-5">
              <Bug size={70} className="text-red-500" weight="light" />
              <div>
                <h4>An Error Occured</h4>
                <h6 className="text-gray-text">Please try again later.</h6>
              </div>
            </div>
          </div>
        </>
      )

    default:
      return (
        <>
          <Head>
            <title>Create Resources | Instrumus Console</title>
          </Head>
    
          <main className="pt-12 px-12 overflow-y-scroll">
            <form action={`/dashboard/resources/${id}/post/custom/info`} method="post" onSubmit={() => {
              setTimeout(() => {
                setState('loading');
              }, 500);
            }}>
              <div className="border-2 rounded-xl p-10">
                <DynamicHeader param="custom_info" />
  
                {customFields.map((field, index) => (
                  <InfoField
                    key={index}
                    index={index}
                    name={field.name}
                    content={field.content}
                    removeField={(index) => {
                      setCustomFields(customFields.filter((_, i) => i !== index))
                    }}
                  />
                ))}

                <button className="py-3 px-6 border-2 border-primary text-primary w-full rounded-full" type="button" onClick={e => {
                  e.preventDefault();
                  setCustomFields([...customFields, { name: '', content: [] }]);
                }}>
                  <h5>Add Custom Field</h5>
                </button>
              </div>
    
              <div className="flex justify-center my-10">
                <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn"
                  type="submit"
                  disabled={customFields.length === 0}
                >
                  <h5 className="font-medium text-white">Submit</h5>
                </button>
              </div>
            </form>
          </main>
        </>
      )
  }
}

// return the Home page wrapped in the Layout component
PostInputFields.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  // @ts-ignore
  const { id } = ctx.params;

  if (req.method !== 'POST') {
    // not a form submission
    return { props: { id, state: 'default' } };
  }

  // parse the body of the request
  const body = await parseBody(req, '5mb');

  if (Object.keys(body).length === 0) {
    return { props: { id, state: 'error' } };
  }
  
  // process the body and send to database
  let count = 0;

  try {
    const batch = writeBatch(db);

    // add custom fields to new data object
    for (let key in body) {
      const val = body[key];

      if (Array.isArray(val)) {
        batch.set(doc(db, `resources/${id}/custom_info`, String(count)),
          {
            name: val.shift(),
            content: [...val]
          }
        );
        count += 1;
      }
    }
    
    await batch.commit();

    // update doc
    await updateDoc(doc(db, `resources/${id}`), {
      ['fields.custom_info']: count
    });
  }
  catch (err) {
    return { props: { id, state: 'error' } };
  }

  // redirect to resource page
  return {
    redirect: {
      destination: `/dashboard/resources/${id}`,
      statusCode: 302,
    }
  };
}

export default PostInputFields