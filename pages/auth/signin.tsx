import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import { useState } from 'react'
import KeyInputField from '../../components/auth/key'
import PasswordInputField from '../../components/auth/password'
import Link from 'next/link'
import Image from 'next/image'
import Spinner from '../../components/lib/spinner'
import logoSvg from '../../public/images/logo.svg'

const SignIn = ({ pageState }: { pageState: 'default' | '401' | '500' }) => {
  const [state, setState] = useState<'default' | 'loading' | '401' | '500'>(pageState);
  // input states
  const [inputsState, setInputsState] = useState({
    isKeyValid: false,
    isPasswordValid: false,
  });

  if (state === 'loading') {
    return (
      <>
        <Head>
          <title>Sign In | Owl Console</title>
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

  return (
    <>
      <Head>
        <title>Sign In | Owl Console</title>
        <meta name="description" content="Owl's landing page"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <main className="flex flex-col w-full h-screen items-center justify-center bg-landing bg-cover">
        <div className="flex flex-col rounded-xl w-1/3 shadow-post-shadow p-10">
          <div className="flex items-center">
            <Image
              src={logoSvg}
              width={45}
              height={45}
              alt='logo'
            />
            <h3 className="ml-3">Owl</h3>
          </div>

          <div className="flex flex-col mt-10 mb-8 gap-y-3">
            <h3 className="font-normal">Sign in to Console</h3>
            <h6 className="text-gray-text">Please enter your credentials below:</h6>
          </div>

          { state === '401' &&
            (
              <h6 className="w-full text-center text-red-500 mb-8">Invalid credentials.</h6>
            )
          }

          { state === '500' &&
            (
              <h6 className="w-full text-center text-red-500 mb-8">An error occured. Please try again later.</h6>
            )
          }

          <form className="flex flex-col justify-around" onSubmit={e => {
            if (inputsState.isKeyValid && inputsState.isPasswordValid) {
              setTimeout(() => {
                setState('loading');
              }, 500);
            }
            else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}>
            <KeyInputField state={inputsState} setState={setInputsState} />
            <PasswordInputField state={inputsState} setState={setInputsState} />

            <button type="submit" className="text-primary border-2 border-primary py-3 rounded-xl">
              <h4>Sign In</h4>
            </button>
          </form>

          <Link href="/auth/forgot">
            <button className="mt-8">
              <h6 className="hover:underline underline-offset-2">Forgot Credentials</h6>
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // available on form submission
  const { key, password } = ctx.query;
  
  if (!key || !password) {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get('auth-token');
    
    // token exists, redirect to dashboard
    if (token) {
      return {
        redirect: {
          destination: '/',
          statusCode: 302
        }
      };
    }
  }
  else {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://owl-console.vercel.app';
    const res = await fetch(`${url}/api/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(
        {
          key,
          password
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    });

    // 200 | 401 | 500
    if (res.status === 200) {
      const cookies = new Cookies(ctx.req, ctx.res);
      // session cookie
      cookies.set('auth-token', res.headers.get('JWT-Token'), {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // authentication successful
      return {
        redirect: {
          destination: '/',
          statusCode: 302
        }
      };
    }
    else if (res.status === 401) {
      // auth error (invalid credentials)
      return {
        props: {
          pageState: '401'
        }
      };
    }
    else {
      // server error
      return {
        props: {
          pageState: '500'
        }
      };
    }
  }

  // no token exists, user needs to log in
  return { 
    props: {
      pageState: 'default'
    } 
  };
}

export default SignIn