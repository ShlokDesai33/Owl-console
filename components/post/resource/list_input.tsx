import { Trash } from 'phosphor-react'
import { useRef } from 'react'

type Props = {
  arrayName: string
  placeholder: string
  inputList: string[]
  setInputList: (inputList: string[]) => void
}

export default function ListInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputList, setInputList } = props

  function handleRemove(ind: number): void {
    const list = [...inputList];
    list.splice(ind, 1);
    setInputList(list);
  }

  function handleAdd(value: string): void {
    if (value === '') return;
    setInputList([...inputList, value]);
  }

  return (
    <>
      <div className="flex items-center mt-6 gap-x-6">
        <input
          type="text"
          placeholder={props.placeholder}
          className="input-field mt-0"
          onKeyDown={(e) => {
            if (['Enter', 'NumpadEnter'].includes(e.key)) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          ref={inputRef}
        />
        <button
          type="button" 
          className="py-2 px-5 border-2 border-primary rounded-xl text-primary disabled:border-gray-btn disabled:text-gray-text" 
          onClick={e => {
            if (!inputRef.current) return;
            e.preventDefault();
            handleAdd(inputRef.current.value as string);
            inputRef.current.value = '';
          }}
          disabled={inputList.length >= 10}
        ><h5>Add</h5></button>
      </div>

      {inputList.map((listItem, index) => (
        <div className="flex items-center justify-between px-5 py-2 bg-gray-bg rounded-xl mt-4 gap-x-5" key={index}>
          <h5 className="truncate">{listItem}</h5>
          
          <button onClick={e => {
            e.preventDefault();
            handleRemove(index);
          }}>
            <Trash size={25} weight="light" />
          </button>

          <input
            type="text"
            name={props.arrayName}
            hidden
            value={listItem}
            readOnly
          />
        </div>
      ))}
    </>
  )
}
