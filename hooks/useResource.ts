import useSWR from 'swr'

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 500 / 404
    if (!res.ok) {
      throw new Error('Not found');
    }
    // 200: OK
    return res.json();
  })
);

export default function useResource(id: string) {
  const { data, error } = useSWR(`/api/resources/get?id=${id}`, fetcher);
  return { data, error };
}