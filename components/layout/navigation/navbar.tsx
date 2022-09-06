import { Books, GearSix, UsersThree } from 'phosphor-react';
import NavButton from './button';

/**
 * Allows the user to navigate to the different pages
 * @returns {JSX.Element} the navigation bar
 */
export default function NavBar(): JSX.Element {
  return (
    <div className="flex flex-col shrink-0 w-80 border-r-2 bg-gray-bg">
      {/* main nav buttons */}
      <div className="flex flex-col gap-y-10 py-12 px-11 border-b-2">
        <NavButton
          title="Admins"
          icon={<UsersThree size={30} />}
          url="/dashboard/admins"
        />
        <NavButton
          title="Resources"
          icon={<Books size={30} weight="light" />}
          url="/dashboard/resources"
        />
      </div>

      {/* other nav buttons */}
      <div className="flex flex-col gap-y-10 pt-12 px-11">
        <NavButton
          title="Settings"
          icon={<GearSix size={30} />}
          url="/dashboard/settings"
        />
      </div>
		</div>
  )
}