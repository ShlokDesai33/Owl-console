import Image from 'next/image'
import blueCheck from '../../../public/images/blue-check.svg'
import User from '../../typescript/interfaces/user'

export default function RawUserDisplay({ user }: { user: User }) {
  return (
    <div className="flex items-center">
      <Image
        src={user.image}
        alt="Profile Picture"
        width={60}
        height={60}
        className="rounded-full"
      />

      <div className="w-min ml-3 mr-5 text-left">
        <h5 className="truncate">{user.fullname}</h5>
        <p className="text-gray-text truncate">@{user.objectID || user.id}</p>
      </div>

      { user.status === 'verified' &&
        (
          <Image
            src={blueCheck}
            width={32}
            height={32}
            alt="Verified Check"
          />
        )
      }
    </div>
  )
}