import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import Head from 'next/head'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import Layout from '../../../../components/layout'
import InfoField from '../../../../components/post/resource/fields/info'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import router from 'next/router'
import Spinner from '../../../../components/lib/spinner'
import { getArray } from '../../../../components/post/resource/functions'

type CustomField = {
  // name of field
  name: string
  content: string[]
}

const CreateResource = ({ data }: { data: string | null }) => {
  const { formData, redirect } = useSessionStorage(3, data);
  const [sampleReqs, setSampleReqs] = useState<string[]>(formData ? getArray(formData.sampleRecs) : []);
  const [customFields, setCustomFields] = useState<CustomField[]>(formData ? formData.infoFields || [] : []);

  if (redirect) {
    router.replace('/dashboard/resources/post/flow1');

    return (
      <>
        <Head>
          <title>Create Resources | Owl Console</title>
        </Head>

        <div className="flex grow place-items-center justify-center">
          <Spinner />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full overflow-x-scroll">
        <form className="w-full pr-8" action="/dashboard/resources/post/flow4" method="post">
          <NewResourceHeader flow={3} />

          <div className="flex">
            <div className="w-1/2 pr-6">
              <h6 className="text-gray-text">Enter a list of sample requirements for your resource. Also add mention packaging instructions here. Note: you <span className="underline underline-offset-2">must add atleast one</span> to procceed.</h6>
              
              <ListInput
                arrayName="sampleReqs"
                placeholder="Sample Requirements"
                inputList={sampleReqs}
                setInputList={setSampleReqs}
              />

              <input
                type="text"
                name="data"
                hidden
                value={data ? data :  JSON.stringify(formData)}
                readOnly
              />
            </div>

            <div className="w-1/2 pl-6">
              <h6 className="text-gray-text">Here you can add custom information display fields to give more details to your customers (optional):</h6>

              {customFields.map((field, index) => (
                <InfoField
                  key={index}
                  name={field.name}
                  content={field.content}
                  index={index}
                  removeField={(index) => {
                    setCustomFields(customFields.filter((_, i) => i !== index))
                  }}
                />
              ))}

              <button className="mt-6 py-3 px-6 bg-gray-bg text-primary w-full rounded-full" type="button" onClick={e => {
                e.preventDefault();
                setCustomFields([...customFields, { name: '', content: [] }]);
              }}>
                <h5>Add Custom Field</h5>
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full mt-10">
            <button className="flex items-center px-5 py-2 bg-primary rounded-xl font-bold gap-x-2 disabled:bg-gray-btn" 
              type="submit"
              disabled={sampleReqs.length === 0}
            >
              <h5 className="font-medium text-white">Next</h5>
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

  if (req.method !== 'POST') {
    return {
      props: {
        data: null
      }
    };
  }

  // parse the body of the request
  const body = await parseBody(req, '1mb');

  if (!body) {
    // check session storage for data
    return {
      props: {
        data: null
      }
    };
  }

  // get /dashboard/resources/flow2 data and parse it
  const prevData = JSON.parse(body.data);
  // construct new object
  const newData = {
    ...prevData,
    applications: body.applications,
    limitations: body.limitations
  }

  return {
    props: {
      data: JSON.stringify(newData)
    }
  };
}

export default CreateResource