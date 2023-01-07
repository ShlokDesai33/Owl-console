import Head from 'next/head'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Instrumus Console</title>
      </Head>
      
      <div className="flex h-full w-full justify-center items-center divide-x-2 gap-x-5 fixed mb-20">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          <h2 className="font-bold">500</h2>
        </div>
        <h3 className="pl-5 font-normal">Internal Server Error</h3>
      </div>
    </>
  )
}