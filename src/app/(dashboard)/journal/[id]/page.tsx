import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import Editor from '@/components/Editor'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      }
    }
  })
  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Subject', value: '' },
    { name: 'Summary', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: false },
  ]

  return (
    <div className="flex h-full">
      <div className="basis-2/3">
        <Editor entry={entry} />
      </div>

      <div className="basis-1/3">
        <div className="p-8 bg-blue-200 border-b border-neutral-400">
          <h1 className="text-lg" >Analysis</h1>
        </div>

        <ul className="">
          {analysisData.map(item => (
            <li key={item.name} className="flex items-center justify-between p-4 border-b border-neutral-400">
              <div className="text-lg font-semibold">{item.name}</div>
              <div>{item.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EntryPage
