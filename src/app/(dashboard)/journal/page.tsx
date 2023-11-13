import { prisma } from '@/utils/db'
import {getUserByClerkId} from "@/utils/auth";

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      user
    }, 
    orderBy: {
      createdAt: 'desc',
    },
    includes: {
      journalEntries: true
    }
  })
}

const JournalPage = () => {
  return <div>journal</div>
}

export default JournalPage