import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import Head from 'next/head'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import Layout from '../../../../components/layout'
import InfoField from '../../../../components/post/resource/fields/info'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'

type CustomField = {
  // name of field
  name: string
  content: string | string[]
}

const CreateResource = ({ data }: { data: string }) => {
  const [sampleReqs, setSampleReqs] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // if data exists, then store it in session storage
  // if no data is passed, try to fetch data from session storage
  // if no data + no session storage, then redirect to /dashboard/resources/post/flow1

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full">
        <form className="w-full pr-8" action="/dashboard/resources/post/flow4" method="post">
          <NewResourceHeader />

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
                value={data}
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
                setCustomFields([...customFields, { name: '', content: '' }]);
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

        <div className="flex flex-col items-center gap-y-3 ml-8 mb-12">
          <h5>50%</h5>
          <div className="flex flex-col justify-end h-full w-3 border-2 rounded-full">
            <div className="w-2 h-1/2 bg-primary rounded-full"></div>
          </div>
        </div>
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

  // parse the body of the request
  const body = await parseBody(req, '1mb');

  if (!body) {
    // check session storage for data
    return { props: { } }
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