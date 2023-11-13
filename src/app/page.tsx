import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  const href  = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="max-w-[600px] flex flex-col gap-y-8">
        <h1 className="text-6xl">Journal app</h1>

        <p className="text-xl text-gray-200">
          Use the app to track your mood and get analysis on any time period. All you have to do is be honest about your journaling
        </p>

        <Link href={href} className="flex items-center max-w-fit bg-blue-600 rounded-lg px-4 h-16 text-xl">
          Get started
        </Link>
      </div>
    </div>
  )
}
