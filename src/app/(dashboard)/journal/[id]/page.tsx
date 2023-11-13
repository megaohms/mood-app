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

  return <div>
    <Editor entry={entry} />
  </div>
}

export default EntryPage
