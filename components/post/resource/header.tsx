import { PlusCircle } from "phosphor-react";

export default function NewResourceHeader() {
  return (
    <div className="flex items-center justify-between border-b-2 pb-4 mb-8">
      <div className="flex items-center gap-x-3">
        <PlusCircle size={30} color="#BE6CFF" />
        <h3 className="font-normal">New Resource</h3>
      </div>

      <button className="py-1 px-6 border-2 border-secondary rounded-full">
        <h6 className="text-secondary font-medium">Help</h6>
      </button>
    </div>
  )
}