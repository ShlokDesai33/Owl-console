import useSWR from 'swr'
import type Organization from '../typescript/interfaces/organization';

type Output = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  data: any
}

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 309: Redirect to login page
    if (res.status === 309) {
      throw new Error('Authentication failed');
    }
    // 200: OK
    return res.json();
  })
);

/**
 * Simple Authentication Hook inspired by next-auth
 * NOTE: this hook is not used in admin pages
 * 
 * @returns {Output}
 */
export default function useSession(): Output {
  // make GET request with httpOnly cookie if it exists
  const { data, error } = useSWR<Organization, Error>('/api/auth/session', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  });

  // we need if else ladder because data and error can both be undefined
  if (error) {
    return {
      status: 'unauthenticated',
      data: null
    };
  }
  else if (data) {
    return {
      status: 'authenticated',
      data: data
    };
  }
  else {
    return {
      status: 'loading',
      data: null
    };
  }
}