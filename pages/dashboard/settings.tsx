import Head from 'next/head'
import Link from 'next/link';
import { Barricade, UserCircle } from 'phosphor-react'
import Layout from '../../components/layout';

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | Instrumus Console</title>
      </Head>
      
      <div className="flex flex-col grow p-12">
        <div className="flex justify-between border-b-2 pb-8">
          <div className="flex items-center">
            <UserCircle size={30} color="#BE6CFF" />
            <h4 className="ml-3">Account Settings</h4>
          </div>

          <Link href="/auth/signout" passHref>
            <button className="py-2 px-6 rounded-full bg-primary text-white">
              <h6 className="font-medium">Sign Out</h6>
            </button>
          </Link>
        </div>

        <div className="flex h-full w-full bg-gray-bg mt-8 rounded-2xl justify-center items-center">
          <div className="flex items-center">
            <Barricade size={40} color="#BE6CFF" />
            <h4 className="ml-3">Coming Soon</h4>
          </div>
        </div>
      </div>
    </>
  )
}

// return the Home page wrapped in the Layout component
Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}