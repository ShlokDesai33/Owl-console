import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import Spinner from '../../../../components/lib/spinner'
import { useRouter } from 'next/router'
import { getArray } from '../../../../components/post/resource/functions'

const CreateResource = ({ data }: { data: string | null }) => {
  const { formData, redirect } = useSessionStorage(2, data);
  const router = useRouter();
  const [applications, setApplications] = useState<string[]>(formData ? getArray(formData.applications) : []);
  const [limitations, setLimitations] = useState<string[]>(formData ? getArray(formData.limitations) : []);

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
        <form className="w-full pr-8" action="/dashboard/resources/post/flow3" method="post">
          <NewResourceHeader flow={2} />

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
                value={data ? data :  JSON.stringify(formData)}
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

  const body = await parseBody(req, '1mb');

  if (!body) {
    // check session storage for data
    return {
      props: {
        data: null
      }
    }
  }

  return {
    props: {
      data: JSON.stringify(body)
    }
  };
}

export default CreateResource