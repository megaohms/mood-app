'use client'

import { useState } from 'react'
import { askQuestion } from '@/utils/api'


const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const onChange = e => setValue(e.target.value)
  
  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    
    const answer = await askQuestion(value)

    setResponse(answer)
    setValue('')
    setLoading(false)
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text"
          disabled={loading}
          value={value}
          onChange={onChange}
          placeholder="Ask a question"
          className="border border-neutral-400 p-4 text-lg rounded-lg"
        />
        <button type="submit"
          disabled={loading}
          className="bg-blue-400 p-4 rounded-lg text-lg">
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question