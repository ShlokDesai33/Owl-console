import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import { useRouter } from 'next/router'
import InfoField from '../../../../components/post/resource/fields/input'

type CustomField = {
  // name of field
  name: string
  content: string[]
  type: 'text' | 'radio' | 'checkbox'
}

const CreateResource = ({ data }: { data: string }) => {
  const router = useRouter();
  const { formData } = useSessionStorage(4, data);
  const [customFields, setCustomFields] = useState<CustomField[]>(formData ? formData.inputFields || [] : []);

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="pt-12 px-12 overflow-y-scroll">
        <form action="/dashboard/resources/post/flow5" method="post">
          <NewResourceHeader flow={4} />

          <h6 className="text-gray-text mb-8">Here you can add custom input fields to configure the resource to your, and your customer's needs(optional):</h6>

          {customFields.map((field, index) => (
            <InfoField
              key={index}
              index={index}
              name={field.name}
              type={field.type}
              content={field.content}
              removeField={(index) => {
                setCustomFields(customFields.filter((_, i) => i !== index))
              }}
            />
          ))}

          <button className="py-3 px-6 border-2 border-primary text-primary w-full rounded-full" type="button" onClick={e => {
            e.preventDefault();
            setCustomFields([...customFields, { name: '', content: [], type: 'text' }]);
          }}>
            <h5>Add Custom Field</h5>
          </button>

          <div className="flex justify-center my-10 gap-x-8">
            <button className="flex items-center px-5 py-2 border-2 border-gray-btn rounded-xl gap-x-2" type="button" onClick={e => {
              e.preventDefault();
              router.push('/dashboard/resources/post/flow2', undefined, { shallow: true });
            }}>
              <ArrowLeft size={27} color="#717171" />
              <h5 className="font-medium text-gray-text">Back</h5>
            </button>

            <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn" type="submit">
              <h5 className="font-medium text-white">Review</h5>
              <ArrowRight size={27} color="white" />
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
CreateResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  if (req.method !== 'POST') return { props: { data: null } };

  const body = await parseBody(req, '5mb');
  if (Object.keys(body).length === 0) return { props: { data: JSON.stringify({}) } };

  // custom fields are present
  const infoFields = [];

  // add custom fields to new data object
  for (let key in body) {
    const val = body[key];

    if (Array.isArray(val)) {
      infoFields.push({
        name: val.shift(),
        content: [...val]
      })
    }
    else {
      infoFields.push({
        name: val
      })
    }
  }
  return {
    props: {
      data: JSON.stringify({ infoFields })
    }
  };
}

export default CreateResource