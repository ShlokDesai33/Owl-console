import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import router from 'next/router'

const CreateResource = ({ data }: { data: string }) => {
  const { formData } = useSessionStorage(5, data);

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full overflow-x-scroll">
        <form className="w-full pr-8" action="/dashboard/resources/post/flow5" method="post">
          <NewResourceHeader flow={4} />

          {/* <h6 className="text-gray-text">Degree of characterisation, solvents and usables</h6> */}

          <div className="flex">
            <div className="w-1/2 pr-6">

            </div>

            <div className="w-1/2 pl-6">
            </div>
          </div>

          <div className="flex justify-center my-10 gap-x-8">
            <button className="flex items-center px-5 py-2 border-2 border-gray-btn rounded-xl gap-x-2" type="button" onClick={e => {
              e.preventDefault();
              router.replace('/dashboard/resources/post/flow4', undefined, { shallow: true });
            }}>
              <ArrowLeft size={27} color="#717171" />
              <h5 className="font-medium text-gray-text">Back</h5>
            </button>

            <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn" 
              type="submit"
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

  if (req.method !== 'POST') return {
    redirect: {
      destination: '/dashboard/resources/post/',
      permanent: false
    }
  };

  const body = await parseBody(req, '5mb');

  console.log(body);
  return { props: { data: null } };

  if (Object.keys(body).length === 0) return { props: { data: null } };

  // custom fields are present
  const prevData = JSON.parse(body.data);

  const newData = {
    ...prevData,
    infoFields: []
  }

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

export default CreateResource