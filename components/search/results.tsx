import { MagnifyingGlassMinus } from 'phosphor-react'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

export function NoResultsBoundary({ children, isSearchStalled }: { children: any, isSearchStalled: boolean }) {
  const { results, indexUiState } = useInstantSearch();

  if (isSearchStalled) {
    return (
      <>
        <div className="rounded-xl mb-6 bg-gray-bg animate-pulse w-full h-32"></div>
        <div className="rounded-xl mb-6 bg-gray-bg animate-pulse w-full h-32"></div>
        <div className="rounded-xl bg-gray-bg animate-pulse w-full h-32"></div>
      </>
    )
  }

  if (!indexUiState.query) {
    return <></>
  }

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className="flex items-center justify-center w-full gap-x-3 pt-2 pb-6">
        <MagnifyingGlassMinus size={30} color="#BDBDBD" />
        <h5>No matches for your search.</h5>
      </div>
    );
  }

  return children;
}