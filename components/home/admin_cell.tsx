import { Trash } from 'phosphor-react'
import User from '../../typescript/interfaces/user'
import RawUserDisplay from '../search/raw'
import { useState } from 'react'
import Spinner from '../lib/spinner'

export default function AdminCell({ user, admins, setAdmins }: { user: User, admins: User[], setAdmins: (admins: User[]) => void }) {
  const [isDeleting, setIsDeleting] = useState(false)

  function removeAdmin() {
    setIsDeleting(true)
    // TODO: remove admin from database
    setAdmins(admins.filter(admin => admin.id !== user.id))
  }

  if (isDeleting) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
        <h5>Removing Admin...</h5>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between" key={user.id}>
      <RawUserDisplay user={user} />
      <button onClick={removeAdmin}>
        <Trash size={32} color="#717171" />
      </button>
    </div>
  );
}