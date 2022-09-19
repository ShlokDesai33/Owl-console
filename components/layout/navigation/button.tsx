import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  url: string
  slug: boolean
  title: string
  icon: React.ReactNode
}

/**
 * Renders a navigation button
 * @returns {JSX.Element} a reactive button
 */
export default function NavButton({ url, title, icon, slug }: Props): JSX.Element {
  const router = useRouter();
  if (!slug ? router.pathname === url : router.pathname.startsWith(url)) {
    return (
      <button className="flex w-fit items-center text-secondary group">
        {icon}
        <h6 className="ml-3 font-medium">{title}</h6>
      </button>
    )
  } else {
    return (
      <Link href={url} passHref>
        <button className="flex w-fit items-center hover:text-black group">
          {icon}
          <h6 className="ml-3 font-medium">{title}</h6>
        </button>
      </Link>
    )
  }
}