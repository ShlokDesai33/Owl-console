function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProgressBar({ flow }: { flow: number }) {
  return (
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
  )
}