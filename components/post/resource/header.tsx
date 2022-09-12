import Link from "next/link";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NewResourceHeader({ flow }: { flow: number }) {
  return (
    <div className="flex items-center mb-12">
      {/* Flow 1 Circle */}
      <Link href={flow > 1 ? '/dashboard/resources/post/flow1' : ''} passHref>
        <button className={classNames(
          flow === 1 ? 'border-4 border-primary bg-white' : 'bg-primary',
          'w-6 h-6 rounded-full shrink-0'
        )}></button>
      </Link>

      <div className="flex h-1 w-full bg-gray-btn">
        <div className={classNames(
          flow > 1 && 'bg-primary',
          'w-full h-1'
        )}></div>
      </div>

      {/* Flow 2 Circle */}
      <Link href={flow > 2 ? '/dashboard/resources/post/flow2' : ''} passHref>
        <button className={classNames(
          flow === 2 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 2 && 'bg-primary',
          flow < 2 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></button>
      </Link>

      <div className="flex h-1 w-full bg-gray-btn">
        <div className={classNames(
          flow > 2 && 'bg-primary',
          'w-full h-1'
        )}></div>
      </div>

      {/* Flow 3 Circle */}
      <Link href={flow > 3 ? '/dashboard/resources/post/flow3' : ''} passHref>
        <button className={classNames(
          flow === 3 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 3 && 'bg-primary',
          flow < 3 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></button>
      </Link>

      <div className="flex h-1 w-full bg-gray-btn">
        <div className={classNames(
          flow > 3 && 'bg-primary',
          'w-full h-1'
        )}></div>
      </div>

      {/* Flow 4 Circle */}
      <Link href={flow > 4 ? '/dashboard/resources/post/flow4' : ''} passHref>
        <button className={classNames(
          flow === 4 ? 'border-4 border-primary bg-white' : 'bg-primary',
          flow > 4 && 'bg-primary',
          flow < 4 && 'bg-gray-btn',
          'w-6 h-6 rounded-full shrink-0'
        )}></button>
      </Link>
    </div>
  )
}