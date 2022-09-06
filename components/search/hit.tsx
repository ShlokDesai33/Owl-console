import { useState } from 'react'
import RawUserDisplay from './raw'

export default function UserHit({ hit }: { hit: any }) {
  // 2 states: loading and hidden
  const [isHidden, setIsHidden] = useState(false);
  // TODO: render organizations
  if (hit.logo && hit.name) return <></>

  function addAdmin() {
    setIsHidden(true);
  }

  if (isHidden) return <></>

  return (
    <button
      className="w-full py-7 px-8 rounded-xl shadow-post-shadow border-2 border-white hover:border-primary hover:shadow-none mb-6"
      onClick={addAdmin}
    >
      <RawUserDisplay user={hit} />
    </button>
  );
}