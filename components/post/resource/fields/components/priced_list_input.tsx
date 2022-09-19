import { Trash } from 'phosphor-react'
import { useRef } from 'react'
import type { Option } from '../../../../../typescript/interfaces/form'

type Props = {
  arrayName: string
  placeholder: string
  inputList: Option[]
  setInputList: (inputList: Option[]) => void
}

export default function ListInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { inputList, setInputList } = props

  function handleRemove(ind: number): void {
    const list = [...inputList];
    list.splice(ind, 1);
    setInputList(list);
  }

  function handleAdd(value: string, priceAddition: number): void {
    if (value === '') return;
    setInputList([...inputList, { value, priceAddition }]);
  }

  return (
    <>
      <div className="flex items-center gap-x-6">
        <div>
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
            autoComplete="off"
            maxLength={250}
            ref={inputRef}
          />

          <input
            type="number"
            placeholder="Price Addition (default 0)"
            className="input-field"
            onKeyDown={(e) => {
              if (['Enter', 'NumpadEnter'].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            autoComplete="off"
            ref={priceRef}
          />
        </div>
        
        <button
          type="button"
          className="py-2 px-5 border-2 border-primary rounded-xl text-primary disabled:border-gray-btn disabled:text-gray-text" 
          onClick={e => {
            e.preventDefault();
            if (!inputRef.current || !priceRef.current) return;
            if (inputRef.current.value.length > 250) return;
            handleAdd(inputRef.current.value, priceRef.current.value ? parseInt(priceRef.current.value) : 0);
            inputRef.current.value = '';
            priceRef.current.value = '';
          }}
          disabled={inputList.length >= 10}
        ><h5>Add</h5></button>
      </div>

      {inputList.map((listItem, index) => (
        <div className="flex items-center justify-between px-5 py-2 bg-gray-bg rounded-xl mt-4 gap-x-5" key={index}>
          <div className="flex gap-x-2">
            <h5 className="truncate">{listItem.value}</h5>
            <h5 className="text-primary">+ ₹{listItem.priceAddition}</h5>
          </div>
          
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
            value={listItem.value}
            readOnly
          />

          <input
            type="text"
            name={props.arrayName}
            hidden
            value={listItem.priceAddition}
            readOnly
          />
        </div>
      ))}
    </>
  )
}
