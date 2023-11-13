
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