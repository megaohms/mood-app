import { UserButton } from '@clerk/nextjs'
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute left-0 top-0 h-full w-64 border-r border-black/10">
        Mood
      </aside>
      
      <div className="ml-64">
        <header className="h-16 border-b border-black/10">
          <div className="h-full w-full px-4 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout