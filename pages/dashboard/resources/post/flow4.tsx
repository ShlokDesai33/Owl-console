import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'

const CreateResource = ({ data }: { data: string }) => {
  const [applications, setApplications] = useState<string[]>([]);
  const [limitations, setLimitations] = useState<string[]>([]);

  // if data exists, then store it in session storage
  // if no data is passed, try to fetch data from session storage
  // if no data + no session storage, then redirect to /dashboard/resources/post/flow1

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full">
        <form className="w-full pr-8" action="/dashboard/resources/post/flow5" method="post">
          <NewResourceHeader />

          <h6 className="text-gray-text">Enter a list of applications and limitations for your resource. Note: you <span className="underline underline-offset-2">must add atleast one of each</span> to procceed.</h6>

          <div className="flex">
            <div className="w-1/2 pr-6">
              <ListInput
                arrayName="applications"
                placeholder="Applications"
                inputList={applications}
                setInputList={setApplications}
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
              <ListInput
                arrayName="limitations"
                placeholder="Limitations"
                inputList={limitations}
                setInputList={setLimitations}
              />
            </div>
          </div>

          <div className="flex justify-center w-full mt-10">
            <button className="flex items-center px-5 py-2 bg-primary rounded-xl font-bold gap-x-2 disabled:bg-gray-btn" 
              type="submit"
              disabled={applications.length === 0 || limitations.length === 0}
            >
              <h5 className="font-medium text-white">Next</h5>
              <ArrowRight size={27} color="white" />
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center gap-y-3 ml-8 mb-12">
          <h5>25%</h5>
          <div className="flex flex-col justify-end h-full w-3 border-2 rounded-full">
            <div className="w-2 h-1/4 bg-primary rounded-full"></div>
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

  const body = await parseBody(req, '5mb');

  if (!body) {
    // check session storage for data
    return { props: { } }
  }

  const prevData = JSON.parse(body.data);
  // check if custom fields are empty
  if (Object.keys(body).length === 2) {
    // only 'sampleReqs' and 'data' are present in body
    const newData = {
      ...prevData,
      sampleReqs: body.sampleReqs
    }
    return { props: { data: JSON.stringify(newData) } }
  }
  else {
    // contruct new data object
    const newData = {
      ...prevData,
      sampleRecs: body.sampleReqs,
      infoFields: []
    }

    delete body.sampleReqs;
    delete body.data;

    // add custom fields to new data object
    for (let key in body) {
      const val = body[key];
      newData.infoFields.push({
        name: val.shift(),
        content: [...val]
      })
    }
    return {
      props: {
        data: JSON.stringify(newData)
      }
    };
  }
}

export default CreateResource