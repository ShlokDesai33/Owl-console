import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import ListInput from '../../../../../components/resources/post/list_input'
import { useEffect, useState } from 'react'
import DynamicHeader from '../../../../../components/resources/view/dynamic_header'
import { doc, runTransaction } from 'firebase/firestore'
import db from '../../../../../firebase'
import Spinner from '../../../../../components/lib/spinner'
import { Bug } from 'phosphor-react'
import useCollection from '../../../../../hooks/useCollection'

type Props = {
  id: string
  param: string
  resState: 'default' | 'error'
}

const CreateResource = ({ param, id, resState }: Props) => {
  const { fields, error } = useCollection(param, id);
  const [inputsArr, setInputsArr] = useState<string[]>(fields ? fields : []);
  const [state, setState] = useState<'default' | 'error' | 'loading'>(resState);

  useEffect(() => {
    setInputsArr(fields ? fields : []);
  }, [fields]);

  if (!fields || state === 'loading') {
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

  if (error || state === 'error') {
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
  }

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="pt-12 px-12 overflow-y-scroll">
        <form action={`/dashboard/resources/${id}/edit/${param}`} method="post" onSubmit={() => {
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
              disabled={inputsArr.length === fields.length}
            >
              <h5 className="font-medium text-white">Submit</h5>
            </button>
          </div>
        </form>
      </main>
    </>
  );
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

  if (!inputsArr) {
    inputsArr = [];
  }

  // could be one string or an array of strings
  if (typeof inputsArr === 'string') {
    inputsArr = [inputsArr];
  }

  if (inputsArr.length > 10) {
    // invalid input
    return { props: { param, id, resState: 'error' } };
  }

  try {
    await runTransaction(db, async (transaction) => {
      // update docs
      inputsArr.map((input: string, index: number) => {
        transaction.set(doc(db, `resources/${id}/${param}`, String(index)), { content: input });
      });

      // delete extra docs
      for (let i = inputsArr.length; i < 10; i++) {
        transaction.delete(doc(db, `resources/${id}/${param}`, String(i)));
      }

      // update num fields in resource doc
      transaction.update(doc(db, `resources/${id}`), {
        [`fields.${param}`]: inputsArr.length
      });
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