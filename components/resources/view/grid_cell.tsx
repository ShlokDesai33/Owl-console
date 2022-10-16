import { Check, PencilSimple, Plus } from 'phosphor-react'
import DynamicHeader from './dynamic_header'
import Link from 'next/link'

type Props = {
  param: string
  count: number
  id: string
};

export default function GridCell({ param, count, id }: Props) {

  const postUrl = param.startsWith('custom') ? 
    `/dashboard/resources/${id}/post/${param.split('_').join('/')}` : 
    `/dashboard/resources/${id}/post/${param}`

  const editUrl = param.startsWith('custom') ?
    `/dashboard/resources/${id}/edit/${param.split('_').join('/')}` :
    `/dashboard/resources/${id}/edit/${param}`

  return (
    <div className="shadow-post-shadow rounded-xl p-10">
      <DynamicHeader param={param} />

      { count === 0 ?
        (
          <div className="flex items-center">
            <h6>No information to display.</h6>
            
            <Link href={postUrl} passHref>
              <button className="ml-auto border-secondary border-2 text-secondary px-6 py-2 rounded-full flex items-center gap-x-1">
                <h6>Add</h6>
                <Plus size={23} />
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <h6>{count}/10 added.</h6>
            <Check size={30} className="text-green-500 ml-2" />

            <Link href={editUrl} passHref>
              <button className="ml-auto border-gray-btn border-2 text-gray-text px-6 py-2 rounded-full flex items-center gap-x-2">
                <h6>Edit</h6>
                <PencilSimple size={23} />
              </button>
            </Link>
          </div>
        )
      }
    </div>
  )
}