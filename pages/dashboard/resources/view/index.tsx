import Head from 'next/head'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'
import Layout from '../../../../components/layout'
import { NextPageWithLayout } from '../../../../typescript/nextpage'
import algoliasearch from 'algoliasearch/lite'
import SearchResources from '../../../../components/search'
import useSession from '../../../../hooks/useSession'
import Spinner from '../../../../components/lib/spinner'

const algoliaClient = algoliasearch(
  '0Q9AHOYTD6',
  '1082e2607eb9dfe00542fd25210af538'
);

const Resources: NextPageWithLayout = () => {
  const { data }= useSession();

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

  return (
    <>
      <Head>
        <title>Your Resources | Owl Console</title>
      </Head>


      <InstantSearch searchClient={algoliaClient} indexName="resources">
        <Configure hitsPerPage={20} filters={`org.id:${data?.orgId}`} />
        <SearchResources />
      </InstantSearch>
    </>
  )
}

// return the Home page wrapped in the Layout component
Resources.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Resources