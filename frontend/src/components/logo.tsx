import { Link } from 'react-router-dom'

type Props = {
  logoText: string
}

export default function Logo({ logoText }: Props) {
  return (
    <Link className="flex items-center justify-center p-4" to="/dashboard">
      <span className="ml-1 sm:ml-2 text-xl sm:text-2xl font-semibold text-blue-500">{logoText}</span>
    </Link>
  )
}