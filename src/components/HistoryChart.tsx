'use client'

import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from 'recharts'

const CustomToolTip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active && payload && payload.length) {
    const analysis = payload[0].payload

    return (
      <div className="p-8 custom-tooltop bg-white/5 shadow-md rounded-lg backdrop-blur-md relative">
        <div className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}></div>
        <p className="label text-sm text-black">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
