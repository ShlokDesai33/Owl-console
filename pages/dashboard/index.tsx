import Head from 'next/head'
import Layout from '../../components/layout'
import { NextPageWithLayout } from '../../typescript/nextpage'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Owl Console</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Home