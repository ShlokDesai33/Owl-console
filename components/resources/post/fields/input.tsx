import { Trash } from 'phosphor-react'
import { useState } from 'react'
import PricedListInput from './components/priced_list_input'
import InputTypes from './components/input_types'

export type Option = {
  value: string
  priceAddition: number
}

type Props = {
  index: number,
  name: string,
  content: Option[]
  type: 'text' | 'radio' | 'checkbox'
  removeField: (index: number) => void
}

// types of input: text, checkbox, radio

export default function InputField(props: Props) {
  const [title, setTitle] = useState<string>(props.name);
  const [content, setContent] = useState<Option[]>(props.content || []);
  const [type, setType] = useState<'text' | 'radio' | 'checkbox'>(props.type);

  return (
    <div className="p-10 shadow-post-shadow rounded-xl mb-12">
      <div className="flex items-center justify-between border-b-2 pb-3">
        <h5>Field #{props.index + 1}</h5>

        <button onClick={e => {
          e.preventDefault();
          props.removeField(props.index);
        }}>
          <Trash size={32} className="text-red-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-7">
        <div>
          <h6 className="text-gray-text mb-2">Choose an input type:</h6>

          <InputTypes type={type} setType={setType} />

          <input
            type="text"
            name={`customField${props.index}`}
            placeholder="Enter field title"
            className="input-field grow-0 mt-8"
            onKeyDown={(e) => {
              if (['Enter', 'NumpadEnter'].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onChange={e => {
              setTitle(e.target.value);
            }}
            defaultValue={props.name}
            autoComplete="off"
            maxLength={200}
            required
          />

          {type === 'text' && 
            (
              <input
                type="text"
                name={`customField${props.index}`}
                hidden
                value="text"
                readOnly
              />
            )
          }

          { type === 'radio' &&
            (
              <div className="mt-6">
                <PricedListInput
                  arrayName={`customField${props.index}`}
                  placeholder="Enter radio option..."
                  inputList={content}
                  setInputList={setContent}
                />

                <input
                  type="text"
                  name={`customField${props.index}`}
                  hidden
                  value="radio"
                  readOnly
                />
              </div>
            )
          }

          { type === 'checkbox' &&
            (
              <div className="mt-6">
                <PricedListInput
                  arrayName={`customField${props.index}`}
                  placeholder="Enter checkbox option..."
                  inputList={content}
                  setInputList={setContent}
                />

                <input
                  type="text"
                  name={`customField${props.index}`}
                  hidden
                  value="checkbox"
                  readOnly
                />
              </div>
            )
          }
        </div>

        <div className="bg-gray-bg rounded-xl p-10">
          <h5>{title ? title : '*Field Title*'}</h5>

          { type === 'text' && <input type="text" className="input-field mt-4" form="" placeholder="Type here..." /> }

          { type === 'radio' && content.map((option, index) => (
            <div key={index} className="flex items-center mt-4">
              <input type="radio" name={`radio${props.index}`} form="" />
              <h6 className="ml-2">{option.value}</h6>
              <h6 className="ml-2 text-primary">+ ₹{option.priceAddition}</h6>
            </div>
          ))}

          { type === 'checkbox' && content.map((option, index) => (
            <div key={index} className="flex items-center mt-4">
              <input type="checkbox" name={`checkbox${props.index}`} form="" />
              <h6 className="ml-2">{option.value}</h6>
              <h6 className="ml-2 text-primary">+ ₹{option.priceAddition}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}