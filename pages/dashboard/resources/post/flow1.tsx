import Head from 'next/head'
import { ArrowRight } from 'phosphor-react'
import Layout from '../../../../components/layout'
import NewResourceHeader from '../../../../components/post/resource/header'
import useSession from '../../../../hooks/useSession'
import { NextPageWithLayout } from '../../../../typescript/nextpage'

const CreateResource: NextPageWithLayout = () => {
  const { data }= useSession();

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full">
        <form className="w-full pr-8" action="/dashboard/resources/post/flow2" method="post">
          <NewResourceHeader />

          <div className="flex">
            <div className="w-1/2 pr-6">
              <input
                type="text"
                name="name"
                placeholder="Resource Name"
                className="input-field mt-0"
                maxLength={50}
                required
              />
              
              <input
                type="text"
                name="description"
                placeholder="Resource Description"
                className="input-field"
                maxLength={150}
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
              
              <input
                type="text"
                name="adminName"
                hidden
                value={data.adminName}
                readOnly
              />

              <input
                type="text"
                name="adminEmail"
                hidden
                value={data.adminEmail}
                readOnly
              />

              <input
                type="text"
                name="adminCell"
                hidden
                value={data.adminCell}
                readOnly
              />

              <h6 className="text-gray-text mt-6">Select the current status of your resource:</h6>
              <select name="status" className="py-4 px-4 w-full rounded-xl border-gray-btn text-xl border-2 mt-2">
                <option value="Available">Available</option>
                <option value="Out of Service">Out of Service</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div className="w-1/2 pl-6">
              <input
                type="number"
                name="price"
                placeholder="Price per Sample (in ₹)"
                className="input-field mt-0"
                maxLength={50}
                required
              />

              <div className="flex gap-x-3 input-field">
                %
                <input
                  type="number"
                  name="studentDiscount"
                  placeholder="Student Discount"
                  className="placeholder:text-gray-text w-full"
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
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full mt-10">
            <button className="flex items-center px-5 py-2 bg-primary rounded-xl font-bold gap-x-2" type="submit">
              <h5 className="font-medium text-white">Next</h5>
              <ArrowRight size={27} color="white" />
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center gap-y-3 ml-8 mb-12">
          <h5>0%</h5>
          <div className="flex flex-col justify-end h-full w-3 border-2 rounded-full">
            <div className="w-2 h-0 bg-primary rounded-full"></div>
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

export default CreateResource