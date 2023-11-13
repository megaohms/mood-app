import { prisma } from '@/utils/db'
import {getUserByClerkId} from "@/utils/auth";
import NewEntryCard from "@/app/components/NewEntryCard";
import EntryCard from "@/app/components/EntryCard";

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      user
    }, 
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h1 className="text-2xl">Journal</h1>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage