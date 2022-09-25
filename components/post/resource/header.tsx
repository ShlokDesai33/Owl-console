import { PlusCircle } from "phosphor-react";

export default function NewResourceHeader({ flow }: { flow: number }) {
  return (
    <>
      <div className="bg-gray-bg rounded-xl w-full py-3 px-5">
        <h6 className="text-gray-text">
          Please fill in all feilds. The more information you provide, the better our algorithm ranks this resource!
        </h6>
      </div>

      <div className="flex items-center justify-between mt-6 mb-8">
        <div className="flex items-center gap-x-3">
          <PlusCircle size={30} color="#BE6CFF" />
          <h3 className="font-normal">New Resource</h3>
        </div>

        <a href="/dashboard/support" target="_blank" rel="noreferrer" className="py-1 px-6 border-2 border-secondary rounded-full">
          <h6 className="text-secondary font-medium">Help</h6>
        </a>
      </div>
    </>
  )
}