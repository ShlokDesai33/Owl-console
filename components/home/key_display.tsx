import { useState } from 'react'
import { Check, Copy, Eye, EyeSlash } from 'phosphor-react'

export default function KeyDisplay({ key }: { key: string }) {
  const [isKeyHidden, setIsKeyHidden] = useState(true);

  return (
    <div className="flex items-center border-2 rounded-lg py-4 px-4 gap-x-5">
      <input
        type={isKeyHidden ? 'password' : 'text'}
        value={key}
        className="w-full text-xl font-normal leading-8 tracking-wide outline-none bg-transparent"
        disabled
      />

      { isKeyHidden ? 
        <button onClick={() => setIsKeyHidden(false)}>
          <Eye size={40} color="#BE6CFF" weight="light" />
        </button>
        : 
        <button onClick={() => setIsKeyHidden(true)}>
          <EyeSlash size={40} color="#BE6CFF" weight="light" />
        </button>
      }

      <CopyButton key={key} />
    </div>
  )
}

// component
function CopyButton({ key }: { key: string }) {
  const [isCopied, setIsCopied] = useState(false);

  if (isCopied) {
    setTimeout(() => {
      setIsCopied(false);
    } , 2000);

    return (
      <button disabled>
        <Check size={40} className="text-green-500" weight="light" />
      </button>
    )
  }

  return (
    <button onClick={e => {
      e.preventDefault();
      navigator.clipboard.writeText(key);
      setIsCopied(true);
    }}>
      <Copy size={40} color="#717171" weight="light" />
    </button>
  )
}