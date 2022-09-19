export default function useSessionStorage(flow: number, data: string | null) {
  // make nextjs and ts happy
  if (typeof window === 'undefined') {
    return {
      formData: null,
    }
  }

  if (data) {
    // TODO: enter special if condition to handle the last flow
    // data exits, store it in session storage
    sessionStorage.setItem(`flow${flow - 1}`, data);
  }
  // get data from session storage if it exists
  const json = sessionStorage.getItem(`flow${flow}`);
  if (json) {
    return {
      formData: JSON.parse(json),
    };
  }
  else {
    return {
      formData: null,
    };
  }
}