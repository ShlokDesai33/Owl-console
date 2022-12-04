import algoliasearch from 'algoliasearch/lite'

const algoliaClient = algoliasearch(
  '0Q9AHOYTD6',
  '4fbd4061c030a50adcb8acfacc323cd3' // owl-console.vercel.app restricted search key
);

export default algoliaClient;