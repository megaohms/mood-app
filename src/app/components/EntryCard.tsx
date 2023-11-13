const EntryCard = ({ entry }) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg shadow-sm bg-white">
      <span className="p-4 sm:p-6 text-2xl">{entry.id}</span>
    </div>
  )
}

export default EntryCard
