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
    },
    include: {
      analysis: true
    }
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const { mood, subject, summary, color, negative } = entry?.analysis
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  return (
    <div className="flex h-full">
      <div className="basis-2/3">
        <Editor entry={entry} />
      </div>

      <div className="basis-1/3">
        <div className="p-8 border-b border-neutral-400" style={{ backgroundColor: color }}>
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
