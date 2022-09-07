import useSWR from 'swr'
import Admin from '../typescript/interfaces/admin'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function useAdmins(orgId: string | undefined) {
  if (!orgId) {
    return { adminsData: undefined };
  }

  const { data } = useSWR<Admin[]>(`/api/admins/get?orgId=${orgId}`, fetcher);
  return { adminsData: data };
}