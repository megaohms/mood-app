import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute left-0 top-0 h-full w-64 border-r border-neutral-400">
        <h2 className="text-2xl p-8">Mood</h2>
        <ul className="gap-y-8 p-4">
          {links.map(link => (
            <li className="p-4" key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>)
          )}
        </ul>
      </aside>
      
      <div className="ml-64 h-full">
        <header className="h-16 border-b border-neutral-400">
          <div className="w-full h-full px-4 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-full bg-neutral-200">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout