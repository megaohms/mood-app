import Link from "next/link";
import { prisma } from '@/utils/db'
import {getUserByClerkId} from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import {analyze} from "@/utils/ai";

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
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage