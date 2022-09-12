import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowRight, Barricade } from 'phosphor-react'
import { useState } from 'react'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import router from 'next/router'
import Spinner from '../../../../components/lib/spinner'

const CreateResource = ({ data }: { data: string }) => {
  const { formData, redirect } = useSessionStorage(4, data);

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
        <form className="w-full pr-8" action="/dashboard/resources/post/flow5" method="post">
          <NewResourceHeader flow={4} />

          <div className="flex grow justify-center items-center gap-x-3">
            <Barricade size={70} color="#BE6CFF" weight="light" />
            <h3 className="font-normal">Comming Soon!</h3>
          </div>

          {/* <h6 className="text-gray-text">Degree of characterisation, solvents and usables</h6> */}

          {/* <div className="flex">
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
          </div> */}
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