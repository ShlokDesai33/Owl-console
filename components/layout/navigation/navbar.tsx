import { Books, GearSix, HouseSimple, PlusCircle, UsersThree } from 'phosphor-react'
import useSession from '../../../hooks/useSession'
import NavButton from './button'
import Image from 'next/image'
import logoSvg from '../../../public/images/logo.svg'

/**
 * Allows the user to navigate to the different pages
 * @returns {JSX.Element} the navigation bar
 */
export default function NavBar(): JSX.Element {
  const { data } = useSession();

  return (
    <div className="flex flex-col shrink-0 w-72 border-r-2 bg-gray-bg">
      {/* logo div */}
      <div className="flex items-center pl-11 border-b-2 h-36 shrink-0">
        <Image
          src={logoSvg}
          width={50}
          height={50}
          alt="Owl Logo"
        />
        <h3 className="ml-1 font-normal">Console</h3>
      </div>
      {/* main nav buttons */}
      <div className="flex flex-col gap-y-10 py-12 pl-11 border-b-2">
        <NavButton
          title="Home"
          icon={<HouseSimple size={30} />}
          url="/dashboard"
          slug={false}
        />

        { data?.isRoot &&
          <NavButton
            title="Admins"
            icon={<UsersThree size={30} />}
            url="/dashboard/admins"
            slug={true}
          />
        }

        <NavButton
          title="Resources"
          icon={<Books size={30} weight="light" />}
          url="/dashboard/resources"
          slug={false}
        />
        
        { data?.isAdmin &&
          <NavButton
            title="Create Resource"
            icon={<PlusCircle size={30} />}
            url="/dashboard/resources/create"
            slug={true}
          />
        }
      </div>

      {/* other nav buttons */}
      <div className="flex flex-col gap-y-10 pt-12 pl-11">
        <NavButton
          title="Settings"
          icon={<GearSix size={30} />}
          url="/dashboard/settings"
          slug={false}
        />
      </div>
		</div>
  )
}