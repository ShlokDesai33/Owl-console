import Head from 'next/head'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'
import Layout from '../../../components/layout'
import { NextPageWithLayout } from '../../../typescript/nextpage'
import algoliasearch from 'algoliasearch/lite'
import SearchResources from '../../../components/search'
import useSession from '../../../hooks/useSession'
import Spinner from '../../../components/lib/spinner'

const algoliaClient = algoliasearch(
  '0Q9AHOYTD6',
  'e5939ceebf94733c18e54c72a3d2686e'
);

const Resources: NextPageWithLayout = () => {
  const { data }= useSession();

  if (!data) {
    return (
      <>
        <Head>
          <title>Create Resources | Instrumus Console</title>
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
        <title>Your Resources | Instrumus Console</title>
      </Head>

      <InstantSearch searchClient={algoliaClient} indexName="resources">
        <Configure hitsPerPage={20} />
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