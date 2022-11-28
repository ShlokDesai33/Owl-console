import algoliasearch from 'algoliasearch/lite'

const algoliaClient = algoliasearch(
  '0Q9AHOYTD6',
  'e5939ceebf94733c18e54c72a3d2686e' // owl-console.vercel.app restricted search key
);

export default algoliaClient;