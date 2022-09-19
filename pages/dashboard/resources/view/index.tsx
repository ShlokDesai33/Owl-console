import Head from 'next/head'
import Layout from '../../../../components/layout'
import { NextPageWithLayout } from '../../../../typescript/nextpage'

const Resources: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Your Resources | Owl Console</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
Resources.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Resources