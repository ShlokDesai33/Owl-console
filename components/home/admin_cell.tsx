import { Trash, User } from 'phosphor-react'
import Admin from '../../typescript/interfaces/admin'
import { useState } from 'react'
import Spinner from '../lib/spinner'

export default function AdminCell({ admin, admins, setAdmins }: { admin: Admin, admins: Admin[], setAdmins: (admins: Admin[]) => void }) {
  const [state, setState] = useState<'default' | 'error' | 'deleting'>('default');

  async function removeAdmin() {
    setState('deleting');
    // TODO: remove admin from database
    const res = await fetch('/api/admins/delete', {
      method: 'POST',
      body: JSON.stringify({
        orgId: admin.orgId,
        adminId: admin.id
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      const id = admin.id;
      setAdmins(admins.filter(admin => id !== admin.id));
      setState('default');
    }
    else {
      setState('error');
      setTimeout(() => setState('default'), 2000);
    }
  }

  if (state === 'deleting') {
    return (
      <div className="flex items-center justify-center gap-x-2 my-10">
        <Spinner />
        <h5>Removing Admin...</h5>
      </div>
    )
  }
  else if (state === 'error') {
    return (
      <div className="flex items-center justify-center gap-x-2 my-10">
        <Trash size={32} className="text-red-500" />
        <h5>Error Removing Admin</h5>
      </div>
    )
  }
  
  return (
    <div className="p-6 border-2 border-gray-btn rounded-xl" key={admin.id}>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-3 items-center">
          <User size={50} color="#BE6CFF" />
          
          <div>
            <h5>{admin.name}</h5>
            <p className="text-gray-text truncate">{admin.team}</p>
          </div>
        </div>

        <button onClick={removeAdmin}>
          <Trash size={32} color="#717171" />
        </button>
      </div>
      <hr className="mt-4 mb-6 border-t-2" />
      <div className="flex divide-x-2">
        <h6 className="pr-4 truncate">{admin.email}</h6>
        <h6 className="pl-4 truncate">{admin.cell}</h6>
      </div>
    </div>
  );
}