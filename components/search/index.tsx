import { MagnifyingGlass, X } from 'phosphor-react'
import { useRef } from 'react'
import { Hits, useSearchBox } from 'react-instantsearch-hooks-web'
import Hit from './hit'
import { NoResultsBoundary } from './results'

export default function SearchResources() {
  // connect custom search box to algolia
  const { refine, clear, isSearchStalled } = useSearchBox();
  // ref to search box
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <div className="pt-12 pb-10 border-b-2 mx-12">
        <div className="flex items-center px-6 py-4 border-2 border-gray-btn rounded-xl">
          <form role="search" className="flex items-center divide-x-2 divide-gray-btn w-full mr-5" onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // manually trigger search
            refine(inputRef.current!.value);
          }}>
            <button><MagnifyingGlass size={30} color="#BE6CFF" /></button>
            <input
              ref={inputRef}
              className="outline-none bg-transparent font-normal text-xl placeholder:text-xl placeholder:text-gray-text w-full ml-4 pl-4"
              placeholder="Search for a Resource..."
            />
          </form>

          <button onClick={() => {
            inputRef.current!.value = '';
            clear();
          }}>
            <X size={30} color="#717171" />
          </button>
        </div>
      </div>
      
      <div className="bg-white overflow-y-scroll h-full">
        <NoResultsBoundary isSearchStalled={isSearchStalled}>
          <Hits hitComponent={Hit} classNames={{
            root: 'mx-auto pb-12 pt-10 px-12',
            list: 'grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8',
            item: 'bg-gray-bg p-4 rounded-md'
          }} />
        </NoResultsBoundary>
      </div>
    </>
  )
}