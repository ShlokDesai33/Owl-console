import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import Spinner from '../../components/lib/spinner'
import { NextPageWithLayout } from '../../typescript/nextpage'

const SignOut: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign Out | Owl Console</title>
        <meta name="description" content="Owl's landing page"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <div className="flex w-screen h-screen items-center justify-center bg-landing bg-cover">
        <Spinner />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);

  cookies.set('auth-token', '', {
    maxAge: 0,
  });

  return {
    props: { },
    redirect: {
      destination: '/auth/signin',
      statusCode: 302
    },
  }
}

export default SignOut