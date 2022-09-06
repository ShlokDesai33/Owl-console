import algoliasearch from 'algoliasearch/lite'

const algoliaClient = algoliasearch(
  '0Q9AHOYTD6',
  '1082e2607eb9dfe00542fd25210af538'
);

// prevent empty searches
const searchClient = {
  ...algoliaClient,
  search(requests: any[]) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export default searchClient;