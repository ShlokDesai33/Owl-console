import { MagnifyingGlassMinus } from 'phosphor-react'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import Spinner from '../lib/spinner';

export function NoResultsBoundary({ children, isSearchStalled }: { children: any, isSearchStalled: boolean }) {
  const { results } = useInstantSearch();

  if (isSearchStalled || !results) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className="flex items-center justify-center h-full gap-x-3">
        <MagnifyingGlassMinus size={30} className="text-red-500" />
        <h5>No Resources to display.</h5>
      </div>
    );
  }

  return children;
}