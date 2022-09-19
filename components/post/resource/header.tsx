import { PlusCircle } from "phosphor-react";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NewResourceHeader({ flow }: { flow: number }) {
  return (
    <div>
      <div className="flex items-center mb-12">
        {/* Flow 1 Circle */}
        <div className={classNames(
          flow === 1 ? 'border-4 border-primary bg-white' : 'bg-primary',
          'w-6 h-6 rounded-full shrink-0'
        )}></div>

        <div className="flex h-1 w-full bg-gray-btn">
          <div className={classNames(
            flow > 1 && 'bg-primary',
            'w-full h-1'
          )}></div>
        </div>

        {/* Flow 2 Circle */}
        <div className={classNames(
          flow === 2 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 2 && 'bg-primary',
          flow < 2 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></div>

        <div className="flex h-1 w-full bg-gray-btn">
          <div className={classNames(
            flow > 2 && 'bg-primary',
            'w-full h-1'
          )}></div>
        </div>

        {/* Flow 3 Circle */}
        <div className={classNames(
          flow === 3 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 3 && 'bg-primary',
          flow < 3 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></div>

        <div className="flex h-1 w-full bg-gray-btn">
          <div className={classNames(
            flow > 3 && 'bg-primary',
            'w-full h-1'
          )}></div>
        </div>

        {/* Flow 4 Circle */}
        <div className={classNames(
          flow === 4 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 4 && 'bg-primary',
          flow < 4 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></div>
      </div>

      <div className="bg-gray-bg rounded-xl w-full py-3 px-5">
        <h6 className="text-gray-text">
          Please fill in all required feilds. The more information you provide, the better our algorithm ranks this resource!
        </h6>
      </div>

      <div className="flex items-center justify-between mt-6 mb-8">
        <div className="flex items-center gap-x-3">
          <PlusCircle size={30} color="#BE6CFF" />
          <h3 className="font-normal">New Resource</h3>
        </div>

        <a href="https://owl-console.vercel.app/dashboard/support" target="_blank" rel="noreferrer" className="py-1 px-6 border-2 border-secondary rounded-full">
          <h6 className="text-secondary font-medium">Help</h6>
        </a>
      </div>
    </div>
  )
}