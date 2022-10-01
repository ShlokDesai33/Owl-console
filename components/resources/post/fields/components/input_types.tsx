import { Article, RadioButton, CheckSquare } from 'phosphor-react'

type Props = {
  type: 'text' | 'radio' | 'checkbox'
  setType: (type: 'text' | 'radio' | 'checkbox') => void
}

export default function InputTypes({ type, setType }: Props) {
  return (
    <div className="flex gap-x-5 gap-y-5 flex-wrap">
      <button
        type="button"
        className="flex items-center gap-x-2 px-6 py-3 rounded-full border-2 disabled:bg-gray-bg disabled:border-white disabled:text-primary"
        onClick={(e) => {
          e.preventDefault();
          setType('text')
        }}
        disabled={type === 'text'}
      >
        <Article size={25} />
        <h5>Text</h5>
      </button>

      <button
        type="button"
        className="flex items-center gap-x-2 px-6 py-3 rounded-full border-2 disabled:bg-gray-bg disabled:border-white disabled:text-primary"
        onClick={(e) => {
          e.preventDefault();
          setType('radio')
        }}
        disabled={type === 'radio'}
      >
        <RadioButton size={22} weight="fill" />
        <h5>Radio</h5>
      </button>

      <button
        type="button"
        className="flex items-center gap-x-2 px-6 py-3 rounded-full border-2 disabled:bg-gray-bg disabled:border-white disabled:text-primary"
        onClick={(e) => {
          e.preventDefault();
          setType('checkbox')
        }}
        disabled={type === 'checkbox'}
      >
        <CheckSquare size={25} />
        <h5>Checkbox</h5>
      </button>
    </div>
  )
}