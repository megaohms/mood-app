
const fullURL = path => window.location.origin + path

export const createNewJournalEntry = async () => {
  const res = await fetch(new Request(fullURL('/api/journal'), {
    method: 'POST',
  }))
  
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateJournalEntry = async (id, content) => {
  const res = await fetch(new Request(fullURL(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ content })
  }))

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
