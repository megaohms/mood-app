'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateJournalEntry } from '@/utils/api'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  
  useAutosave({
    data: value,
    interval: 1000,
    onSave: async updatedValue => {
      setIsLoading(true)
      await updateJournalEntry(entry.id, updatedValue)
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>loading...</div>}
      <textarea
        className="w-full h-full p-8 text-lg"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
