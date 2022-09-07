import Admin from '../../typescript/interfaces/admin'
import AdminCell from './admin_cell'

type Props = {
  admins: Admin[] | undefined;
  setAdmins: (admins: Admin[]) => void
}

export default function RenderAdmins({ admins, setAdmins }: Props) {
  if (!admins) {
    return (
      <>
        <div className="rounded-xl bg-gray-bg animate-pulse w-full h-48"></div>
        <div className="rounded-xl bg-gray-bg animate-pulse w-full h-48"></div>
        <div className="rounded-xl bg-gray-bg animate-pulse w-full h-48"></div>
        <div className="rounded-xl bg-gray-bg animate-pulse w-full h-48"></div>
      </>
    );
  }
  else if (admins.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-2">
        <h5>Your organization has no admins yet.</h5>
        <h6 className="text-gray-text">Fill the form on the right to add your first admin.</h6>
      </div>
    )
  }
  return (
    <>
      {admins?.map(admin => (
        <AdminCell key={admin.id} admin={admin} admins={admins} setAdmins={setAdmins} />
      ))}
    </>
  );
}