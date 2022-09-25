import { Trash } from 'phosphor-react'
import { useState } from 'react'
import ListInput from '../list_input'

type Props = {
  index: number,
  name: string,
  content: string[]
  removeField: (index: number) => void
}

export default function InfoField(props: Props) {
  const [title, setTitle] = useState<string>(props.name);
  const [content, setContent] = useState<string[]>(props.content || []);

  return (
    <div className="p-10 shadow-post-shadow rounded-xl mb-12">
      <div className="flex items-center justify-between border-b-2 pb-3">
        <h5>Custom Info Field #{props.index + 1}</h5>

        <button onClick={e => {
          e.preventDefault();
          props.removeField(props.index);
        }}>
          <Trash size={32} className="text-red-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-7">
        <div>
          <h6 className="text-gray-text">
            Enter information you want to display to users in the form of bullet points:
          </h6>

          <input
            type="text"
            name={`customField${props.index}`}
            placeholder="Enter field title"
            className="input-field mt-4 mb-6 grow-0"
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

          <ListInput
            arrayName={`customField${props.index}`}
            placeholder="Enter bullet points..."
            inputList={content}
            setInputList={setContent}
          />
        </div>

        <div className="bg-gray-bg rounded-xl p-10">
          <h5>{title}</h5>

          <ol className="flex flex-col gap-y-2 mt-3 list-disc list-inside">
            {content.map((item, index) => (
              <li className="text-lg font-normal leading-8 tracking-wide" key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}