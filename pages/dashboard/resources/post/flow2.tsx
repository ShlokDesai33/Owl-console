import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { parseBody } from 'next/dist/server/api-utils/node'
import { ArrowLeft, ArrowRight, Flask, Package, UserCircle } from 'phosphor-react'
import ListInput from '../../../../components/post/resource/list_input'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import Spinner from '../../../../components/lib/spinner'
import { useRouter } from 'next/router'
import { getArray } from '../../../../components/post/resource/functions'
import { useState } from 'react'
import useSession from '../../../../hooks/useSession'

const CreateResource = ({ data }: { data: string | null }) => {
  const { formData } = useSessionStorage(2, data);
  const router = useRouter();
  const [sampleReqs, setSampleReqs] = useState<string[]>(formData ? getArray(formData.sampleRequirements) : []);
  const [packagingIns, setPackagingIns] = useState<string[]>(formData ? getArray(formData.packagingInstructions) : []);
  const { data: session } = useSession();

  if (!session) {
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

      <main className="pt-12 px-12 overflow-y-scroll">
        <form action="/dashboard/resources/post/flow3" method="post">
          <NewResourceHeader flow={2} />

          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="shadow-post-shadow rounded-xl p-10 h-fit">
                <div className="flex items-center mb-6 gap-x-2">
                  <Flask size={30} color="#2F80ED" />
                  <h4>Sample Requirements</h4>
                </div>

                <h6 className="text-gray-text mb-3">
                  <span className="underline underline-offset-2">Required:</span>{' '}one or more sample requirements.
                </h6>

                <ListInput
                  arrayName="sampleRequirements"
                  placeholder="Type here..."
                  inputList={sampleReqs}
                  setInputList={setSampleReqs}
                />
              </div>

              <div className="shadow-post-shadow rounded-xl p-10 h-fit mt-12">
                <div className="flex items-center mb-6 gap-x-3">
                  <Package size={30} color="#2F80ED" />
                  <h4>Packaging & Shipping Instructions</h4>
                </div>

                <h6 className="text-gray-text mb-3">If this resource accepts sample submissions, this field is required. Don&apos;t forget to add your shipping/postal address!</h6>
                
                <ListInput
                  arrayName="packagingInstructions"
                  placeholder="Type here..."
                  inputList={packagingIns}
                  setInputList={setPackagingIns}
                />
              </div>
            </div>

            <div>
              <div className="pl-6 shadow-post-shadow rounded-xl p-10">
                <div className="flex items-center gap-x-2 mb-6">
                  <UserCircle size={30} color="#2F80ED" />
                  <h4>Admin Details</h4>
                </div>

                <h6 className="text-gray-text mb-3">These details will be given to users looking to rent this resource:</h6>

                <input
                  name="adminName"
                  className="input-field mt-0 bg-gray-bg border-0"
                  defaultValue={session.adminName}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  readOnly
                />

                <input
                  name="adminEmail"
                  className="input-field bg-gray-bg border-0"
                  defaultValue={session.adminEmail}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  readOnly
                />

                <div className="flex gap-x-2 input-field bg-gray-bg border-0">
                  +91
                  <input
                    name="adminCell"
                    className="outline-none bg-transparent"
                    defaultValue={session.adminCell}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-10 gap-x-8">
            <button className="flex items-center px-5 py-2 border-2 border-gray-btn rounded-xl gap-x-2" type="button" onClick={e => {
              e.preventDefault();
              router.push('/dashboard/resources/post/');
            }}>
              <ArrowLeft size={27} color="#717171" />
              <h5 className="font-medium text-gray-text">Back</h5>
            </button>

            <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn"
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
  if (req.method !== 'POST') return { props: { data: null } };

  const body = await parseBody(req, '5mb');
  if (Object.keys(body).length === 0) return { props: { data: null } };

  return {
    props: {
      data: JSON.stringify(body)
    }
  };
}

export default CreateResource