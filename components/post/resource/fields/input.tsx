import { Trash } from 'phosphor-react'
import CustomListInput from './custom_list_input'

type Props = {
  index: number,
  name: string,
  content: string | string[]
  removeField: (index: number) => void
}

export default function InfoField(props: Props) {
  return (
    <div className="p-8 shadow-post-shadow rounded-xl mt-6">
      <div className="flex items-center justify-between border-b-2 pb-3">
        <h5>Custom Field #{props.index + 1}</h5>

        <button onClick={e => {
          e.preventDefault();
          props.removeField(props.index);
        }}>
          <Trash size={32} color="#717171" />
        </button>
      </div>

      <h6 className="text-gray-text mt-5">Enter information you want to display to users in the form of bullet points and leave the formatting to us ;)</h6>

      <input
        type="text"
        name={`customField${props.index}`}
        placeholder="Enter field name"
        className="input-field mt-4"
      />
      <CustomListInput
        arrayName={`customField${props.index}`}
        placeholder="Enter bullet points"
      />
    </div>
  )
}