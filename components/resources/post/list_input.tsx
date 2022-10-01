import { Trash } from 'phosphor-react'
import { useRef } from 'react'

type Props = {
  inputList: string[]
  setInputList: (inputList: string[]) => void
  arrayName?: string
}

export default function ListInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputList, setInputList } = props

  function handleRemove(ind: number): void {
    const list = [...inputList];
    list.splice(ind, 1);
    setInputList(list);
  }

  function handleAdd(): void {
    // error handling 1
    if (!inputRef.current) return;
    if (inputList.length >= 10) return;
    // get current value of input
    const val = inputRef.current.value as string;
    // error handling 2
    if (val.length === 0 || val.length > 250) return;
    // add value to list
    setInputList([...inputList, val]);
    inputRef.current.value = '';
  }

  return (
    <>
      <div className="flex items-center gap-x-6">
        <input
          type="text"
          placeholder="Type here..."
          className="input-field mt-0"
          onKeyDown={(e) => {
            if (['Enter', 'NumpadEnter'].includes(e.key)) {
              // prevent form submission
              e.preventDefault();
              e.stopPropagation();
              // add input value to list and clear input
              handleAdd();
            }
          }}
          autoComplete="off"
          maxLength={250}
          ref={inputRef}
        />
        
        <button
          type="button"
          className="py-2 px-5 border-2 border-primary rounded-xl text-primary disabled:border-gray-btn disabled:text-gray-text" 
          onClick={e => { e.preventDefault(); handleAdd(); }}
          disabled={inputList.length >= 10}
        ><h5>Add</h5></button>
      </div>

      {inputList.map((listItem, index) => (
        <div className="flex items-center justify-between px-5 py-2 bg-gray-bg rounded-xl mt-4 gap-x-5" key={index}>
          <h5 className="truncate">{listItem}</h5>
          
          <button onClick={e => { e.preventDefault(); handleRemove(index); }}>
            <Trash size={25} weight="light" />
          </button>

          <input
            type="text"
            name={props.arrayName ? props.arrayName : "inputsArr"}
            hidden
            value={listItem}
            readOnly
          />
        </div>
      ))}
    </>
  )
}
