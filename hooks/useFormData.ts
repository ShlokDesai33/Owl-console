export default function useFormData(data: string | null) {
  // make nextjs and ts happy
  if (typeof window === 'undefined') {
    return {
      formData: null,
    }
  }

  if (data) {
    sessionStorage.setItem('formData', data);

    return {
      formData: data,
    }
  }
  else {
    const json = sessionStorage.getItem('formData');
  
    if (json) {
      return {
        formData: JSON.parse(json)
      };
    }
    else {
      return {
        formData: null,
      };
    }
  }
}