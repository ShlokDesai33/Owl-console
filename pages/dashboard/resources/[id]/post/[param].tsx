import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import ListInput from '../../../../../components/resources/post/list_input'
import { useState } from 'react'
import DynamicHeader from '../../../../../components/resources/view/dynamic_header'
import { writeBatch, doc, updateDoc } from 'firebase/firestore'
import db from '../../../../../firebase'
import Spinner from '../../../../../components/lib/spinner'
import { Bug } from 'phosphor-react'

type Props = {
  id: string
  param: string
  resState: 'default' | 'error'
}

const CreateResource = ({ param, id, resState }: Props) => {
  const [inputsArr, setInputsArr] = useState<string[]>([]);
  const [state, setState] = useState<'default' | 'error' | 'loading'>(resState);

  switch (state) {
    case 'loading':
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

    case 'error':
      return (
        <>
          <Head>
            <title>Create Resources | Owl Console</title>
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
            <title>Create Resources | Owl Console</title>
          </Head>
    
          <main className="pt-12 px-12 overflow-y-scroll">
            <form action={`/dashboard/resources/${id}/post/${param}`} method="post" onSubmit={() => {
              setTimeout(() => {
                setState('loading');
              }, 500);
            }}>
              <div className="flex justify-center">
                <div className="shadow-post-shadow rounded-xl p-10 w-1/2">
                  <DynamicHeader param={param} />
    
                  <ListInput
                    inputList={inputsArr}
                    setInputList={setInputsArr}
                  />
                </div>
              </div>
    
              <div className="flex justify-center my-10">
                <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn"
                  type="submit"
                  disabled={inputsArr.length === 0}
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
CreateResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  // @ts-ignore
  const { param, id } = ctx.params;

  if (req.method !== 'POST') {
    // not a form submission
    return { props: { param, id, resState: 'default' } };
  }

  // parse the body of the request
  const body = await parseBody(req, '5mb');
  let { inputsArr } = body;

  // could be one string or an array of strings
  if (typeof inputsArr === 'string') {
    inputsArr = [inputsArr];
  }

  if (!inputsArr || inputsArr.length === 0 || inputsArr.length > 10) {
    // invalid input
    return { props: { param, id, resState: 'error' } };
  }

  try {
    const batch = writeBatch(db);
  
    inputsArr.map((input: string, index: number) => {
      batch.set(doc(db, `resources/${id}/${param}`, String(index)), { content: input });
    });
  
    await batch.commit();

    // update doc
    await updateDoc(doc(db, `resources/${id}`), {
      [`fields.${param}`]: inputsArr.length
    });
  }
  catch (err) {
    return { props: { param, id, resState: 'error' } };
  }

  // redirect to resource page
  return {
    redirect: {
      destination: `/dashboard/resources/${id}`,
      statusCode: 302,
    }
  };
}

export default CreateResource