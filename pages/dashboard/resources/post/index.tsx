import Head from 'next/head'
import { ArrowRight, CurrencyDollar, Faders, Prohibit, Wrench } from 'phosphor-react'
import Layout from '../../../../components/layout'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSession from '../../../../hooks/useSession'
import { NextPageWithLayout } from '../../../../typescript/nextpage'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import Spinner from '../../../../components/lib/spinner'
import { useState } from 'react'
import { getArray } from '../../../../components/post/resource/functions'
import ListInput from '../../../../components/post/resource/list_input'

const CreateResource: NextPageWithLayout = () => {
  const { data }= useSession();
  const { formData } = useSessionStorage(1, null);
  const [applications, setApplications] = useState<string[]>(formData ? getArray(formData.applications) : []);
  const [limitations, setLimitations] = useState<string[]>(formData ? getArray(formData.limitations) : []);

  if (!data) return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <div className="flex grow place-items-center justify-center">
        <Spinner />
      </div>
    </>
  )

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="pt-12 px-12 overflow-y-scroll">
        <form action="/dashboard/resources/post/flow2" method="post">
          <NewResourceHeader flow={1} />

          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="shadow-post-shadow rounded-xl p-10 h-fit">
                <div className="flex items-center mb-8 gap-x-2">
                  <Faders size={30} color="#2F80ED" />
                  <h4>General</h4>
                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Resource Name"
                  className="input-field mt-0"
                  maxLength={50}
                  defaultValue={formData ? formData.name : ''}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />
                
                <input
                  type="text"
                  name="description"
                  placeholder="Resource Description"
                  className="input-field"
                  maxLength={150}
                  defaultValue={formData ? formData.description : ''}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />

                <input
                  type="text"
                  name="orgId"
                  hidden
                  value={data.orgId}
                  readOnly
                />

                <input
                  type="text"
                  name="orgLogo"
                  hidden
                  value={data.orgLogo}
                  readOnly
                />

                <input
                  type="text"
                  name="orgName"
                  hidden
                  value={data.orgName}
                  readOnly
                />

                <h6 className="text-gray-text mt-4">Select the current status of your resource:</h6>
                <select name="status" className="py-4 px-4 w-full rounded-xl border-gray-btn text-xl border-2 mt-2">
                  <option value="Available">Available</option>
                  <option value="Out of Service">Out of Service</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="shadow-post-shadow rounded-xl p-10 h-fit mt-12">
                <div className="flex items-center mb-6 gap-x-2">
                  <Wrench size={30} color="#2F80ED" />
                  <h4>Applications</h4>
                </div>

                <h6 className="text-gray-text mb-2">Atleast one application is required:</h6>
                <ListInput
                  arrayName="applications"
                  placeholder="Applications"
                  inputList={applications}
                  setInputList={setApplications}
                />
              </div>
            </div>

            <div>
              <div className="shadow-post-shadow rounded-xl p-10">
                <div className="flex items-center mb-6 gap-x-1">
                  <CurrencyDollar size={30} color="#2F80ED" />
                  <h4>Pricing</h4>
                </div>

                <h6 className="text-gray-text">Select a price metric (priced per sample by default):</h6>
                <select name="priceMetric" className="py-4 px-4 w-full rounded-xl border-gray-btn text-xl border-2 mt-2">
                  <option value="perSample">Per Sample</option>
                  <option value="hourly">Hourly</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="input-field"
                  maxLength={50}
                  defaultValue={formData ?  formData.price : ''}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />

                <div className="flex gap-x-3 input-field">
                  %
                  <input
                    type="number"
                    name="studentDiscount"
                    placeholder="Student Discount"
                    className="placeholder:text-gray-text w-full"
                    defaultValue={formData ?  formData.studentDiscount : ''}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    required
                  />
                </div>
                <div className="flex gap-x-3 input-field">
                  %
                  <input
                    type="number"
                    name="researcherDiscount"
                    placeholder="Researcher/Educator Discount"
                    className="placeholder:text-gray-text w-full"
                    defaultValue={formData ? formData.researcherDiscount : ''}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    required
                  />
                </div>
              </div>

              <div className="shadow-post-shadow rounded-xl p-10 h-fit mt-12">
                <div className="flex items-center mb-6 gap-x-2">
                  <Prohibit size={30} color="#2F80ED" />
                  <h4>Limitations</h4>
                </div>

                <h6 className="text-gray-text mb-2">Atleast one limitation is required:</h6>
                <ListInput
                  arrayName="limitations"
                  placeholder="Limitations"
                  inputList={limitations}
                  setInputList={setLimitations}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <button 
              className="flex items-center px-5 py-2 bg-primary rounded-xl font-bold gap-x-2 disabled:bg-gray-btn"
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

export default CreateResource