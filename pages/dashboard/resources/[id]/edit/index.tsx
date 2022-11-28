import { useRouter } from "next/router"
import useResource from "../../../../../hooks/useResource"

const EditResource = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useResource(id as string);
  console.log(data)

  if (error) {
    return <div>Failed to load</div>
  }
  
  return (
    <>
      hi
    </>
  )
}

export default EditResource