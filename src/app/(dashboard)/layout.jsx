import { UserButton } from '@clerk/nextjs'
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute left-0 top-0 h-full w-64 border-r border-neutral-400">
        Mood
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