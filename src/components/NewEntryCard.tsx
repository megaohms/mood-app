'use client'

import { createNewJournalEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const entry = await createNewJournalEntry()
    router.push(`/journal/${entry.id}`)
  }

  return (
    <div className="cursor-pointer rounded-md shadow-md bg-white p-4 sm:p-6" onClick={handleOnClick}>
      <span className="text-2xl">New Entry</span>
    </div>
  )
}

export default NewEntryCard
