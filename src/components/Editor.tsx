'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateJournalEntry } from '@/utils/api'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const { mood, subject, summary, color, negative } = entry.analysis
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  
  useAutosave({
    data: value,
    interval: 1000,
    onSave: async updatedValue => {
      setIsLoading(true)
      const updatedEntry = await updateJournalEntry(entry.id, updatedValue)
      setAnalysis(updatedEntry.analysis)
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full h-full flex flex-row">
      <div className="h-full basis-2/3 p-8">
        {isLoading && <div>loading...</div>}
        <textarea
          className="w-full h-1/2 p-8 text-lg"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div className="basis-1/3 bg-white">
        <div className="p-8 border-b-neutral-400" style={{ backgroundColor: color }}>
          <h1 className="text-lg" >Analysis</h1>
        </div>

        <ul>
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

export default Editor
