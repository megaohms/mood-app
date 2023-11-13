const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="rounded-md shadow-md bg-white divide-y divide-neutral-600">
      <div className="p-4 sm:p-6 text-md">{date}</div>
      <div className="p-4 sm:p-6 text-md">summary</div>
      <div className="p-4 sm:p-6 text-md">mood</div>
    </div>
  )
}

export default EntryCard
