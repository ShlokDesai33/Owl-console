import Head from 'next/head'
import { Barricade } from 'phosphor-react'
import Layout from '../../components/layout'

export default function CustomerSupport() {
  return (
    <>
      <Head>
        <title>Customer Support | Owl Console</title>
      </Head>
      
      <div className="flex h-full w-full justify-center items-center gap-x-3 fixed mb-20">
        <Barricade size={70} color="#BE6CFF" weight="light" />
        <h3 className="font-normal">Comming Soon!</h3>
      </div>
    </>
  )
}

// return the Home page wrapped in the Layout component
CustomerSupport.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}