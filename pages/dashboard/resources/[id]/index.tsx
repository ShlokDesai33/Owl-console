import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../../../components/layout'
import useResource from '../../../../hooks/useResource'
import GridCell from '../../../../components/resources/view/grid_cell'
import ProgressBar from '../../../../components/resources/view/progress'
import Spinner from '../../../../components/lib/spinner'
import { classNames } from '../../../../components/resources/functions'
import { Bug, PencilSimple } from 'phosphor-react'

const ViewResource = ({ id }: { id: string }) => {
  const { data, error } = useResource(id);

  if (!data) {
    return (
      <>
        <Head>
          <title>Create Resources | Owl Console</title>
        </Head>

        <div className="flex grow place-items-center justify-center">
          <Spinner />
        </div>
      </>
    )
  }
  else if (!data && error) {
    return (
      <>
        <Head>
          <title>Create Resources | Owl Console</title>
        </Head>
  
        <div className="flex grow place-items-center justify-center">
          <div className="flex items-center gap-x-5">
            <Bug size={70} className="text-red-500" weight="light" />
            <div>
              <h4>An Error Occured</h4>
              <h6 className="text-gray-text">Please try again later.</h6>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Home | Owl Console</title>
      </Head>

      <main className="pt-12 px-12 overflow-y-auto h-full">
        <div className="flex gap-x-10 justify-between bg-gray-bg p-8 rounded-xl">
          <div className="shrink-0">
            <Image
              src={data.image}
              alt={data.name}
              width={250}
              height={250}
              className="rounded-xl"
            />
          </div>

          <div className="flex divide-x-2 w-full justify-between gap-x-10">
            <div>
              <h3>{data.name}</h3>
              <h6 className="mt-2">{data.description}</h6>
            </div>

            <div className="pl-10 shrink-0">
              <p>Status:</p>
              <h5 className={classNames(
                data.status === 'Available' && 'text-green-500',
                data.status === 'Out of Service' && 'text-red-500',
                data.status === 'Under Maintenance' && 'text-yellow-500',
              )}>{data.status}</h5>

              <p className="mt-8 mb-4">Pricing:</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center border-gray-btn border-2 p-4 rounded-xl">
                  <h5>₹{data.prices.industry}</h5>
                  <p className="text-gray-text">Industry</p>
                </div>

                { data.prices.faculty !== data.prices.industry ?
                  (
                    <div className="text-center border-gray-btn border-2 p-4 rounded-xl">
                      <h5>₹{data.prices.faculty}</h5>
                      <p className="text-gray-text">Faculty</p>
                    </div>
                  ) :
                  (
                    <div className="border-gray-btn border-2 p-4 rounded-xl border-dotted"></div>
                  )
                }
              </div>
            </div>
          </div>

          <button className="p-2 border-2 border-secondary rounded-full h-fit shrink-0">
            <PencilSimple size={30} className="text-secondary" weight="bold" />
          </button>
        </div>

        <ProgressBar fields={data.fields} />

        <div className="grid grid-cols-2 gap-10 mb-10">
          { Object.entries(data.fields).sort().map(([key, value]) => (
              <GridCell param={key} count={value as number} id={data.id} key={key} />
            ))
          }
        </div>
      </main>
    </>
  )
}

// return the ViewResource page wrapped in the Layout component
ViewResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const { id } = ctx.params;

  return { props: { id } };
}

export default ViewResource