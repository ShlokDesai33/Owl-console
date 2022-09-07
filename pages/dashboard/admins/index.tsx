import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import RenderAdmins from '../../../components/home/render_admins'
import RenderTeams from '../../../components/home/render_teams'
import Layout from '../../../components/layout'
import useAdmins from '../../../hooks/useAdmins'
import useSession from '../../../hooks/useSession'
import Admin from '../../../typescript/interfaces/admin'
import Spinner from '../../../components/lib/spinner'
import { Prohibit } from 'phosphor-react'

const ManageAdmins = ({ error }: { error: boolean }) => {
  const { data } = useSession();
  const { adminsData } = useAdmins(data?.orgId);
  const [admins, setAdmins] = useState<Admin[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAdmins(adminsData);
  }, [adminsData]);

  if (!data || isLoading) {
    return (
      <>
        <Head>
          <title>Admin Management | Owl Console</title>
        </Head>

        <div className="flex h-full w-full items-center justify-center pb-10">
          <Spinner />
        </div>
      </>
    )
  }

  if (!data.isRoot) {
    return (
      <>
        <Head>
          <title>Admin Management | Owl Console</title>
        </Head>

        <div className="flex w-full justify-center items-center gap-x-3">
          <Prohibit size={70} color="#BE6CFF" weight="light" />
          <h3 className="font-normal">Access Restricted.</h3>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Management | Owl Console</title>
      </Head>
      
      <main className="flex w-full h-full">
        <div className="flex flex-col gap-y-8 w-1/2 pt-12 pl-12 pr-6 overflow-y-scroll">
          <h4>Your Admins:</h4>
          <RenderAdmins admins={admins} setAdmins={setAdmins} />
        </div>

        <div className="flex flex-col pt-12 px-12 w-1/2 overflow-y-scroll">
          <RenderTeams admins={admins} />

          <h4 className="mt-8">Add Admin:</h4>
          <p className="text-gray-text mb-2">Please fill in all the fields below.</p>

          { error && 
            <h6 className="w-full text-center text-red-500 mt-4 mb-2">An error occured. Please try again later.</h6>
          }

          <form>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input-field"
              maxLength={50}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              required
            />
            <div className="flex gap-x-2 input-field">
              +91
              <input
                type="tel"
                name="cell"
                placeholder="Contact Number"
                className="placeholder:text-gray-text w-full"
                maxLength={15}
                required
              />
            </div>
            <input
              type="text"
              name="team"
              placeholder="Team"
              className="input-field"
              maxLength={50}
              required
            />
            <input
              type="hidden"
              name="orgId"
              value={data.orgId}
              required
            />

            <div className="flex justify-center w-full mt-10">
              <button className="px-5 py-2 bg-primary text-white rounded-xl font-bold" type="submit" onClick={() => {
                setTimeout(() => {
                  setIsLoading(true);
                }, 500);
              }}>
                <h5>Submit</h5>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // available on form submission
  const { name, email, cell, team, orgId } = ctx.query;

  if (!orgId) {
    return {
      props: {
        error: false
      }
    };
  }

  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://owl-console.vercel.app';
  const res = await fetch(`${url}/api/admins/post`, {
    method: 'POST',
    body: JSON.stringify(
      {
        fullname: name,
        email,
        cell,
        team,
        orgId
      }
    ),
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.status === 201) {
    return {
      props: { },
      redirect: {
        destination: '/dashboard/admins',
        statusCode: 302
      }
    };
  }
  else {
    return {
      props: {
        error: true
      }
    };
  }
}

// return the Home page wrapped in the Layout component
ManageAdmins.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ManageAdmins