import Head from 'next/head'
import Layout from '../../components/layout';
import useSession from '../../hooks/useSession'
import { NextPageWithLayout } from '../../typescript/nextpage';

const ManageAdmins: NextPageWithLayout = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Admin Management | Owl Console</title>
      </Head>
      
      <main className="flex">
        <div className="flex flex-col">
          
        </div>

        <div className="flex flex-col">
          <h4>Add Admin:</h4>

          <h6>full name</h6>
          <h6>email</h6>
          <h6>cell</h6>
          
        </div>
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
ManageAdmins.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ManageAdmins