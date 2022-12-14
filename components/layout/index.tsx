import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import useSession from '../../hooks/useSession'
import Spinner from '../lib/spinner'
import NavBar from './navigation/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();

  if (status !== 'authenticated' || !data) {
    // status could be 'loading' or 'unauthenticated'
    if (status === 'unauthenticated') {
      // redirect to login page
      router.push('/auth/signin');
    }
    // loading state
    return (
      <>
        <Head>
          <title>Instrumus Console</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="author" content="Owl"></meta>
          <link rel="icon" href="/images/favicon.ico" />
        </Head>

        <div className="flex w-screen h-screen items-center justify-center bg-landing bg-cover">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Instrumus Console</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div className="flex w-screen h-screen">
        <NavBar />
        {/* lhs div */}
        <div className="flex flex-col h-full w-full">
          <div>
            <div className="flex items-center justify-end px-12 border-b-2 bg-gray-bg h-36">
              {/* user profile div */}
              <div className="flex items-center gap-x-3">
                <Image
                  src={data.orgLogo}
                  width={60}
                  height={60}
                  alt="Profile Picture"
                  className="rounded-full object-fill"
                />

                <div>
                  <h5 className="text-left truncate">{data.orgName}</h5>
                  <p className="text-gray-text text-left truncate">@{data.orgId}</p>
                </div>
              </div>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </>
  )
}