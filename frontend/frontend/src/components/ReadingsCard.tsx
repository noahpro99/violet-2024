import React from 'react'
import { Link } from 'react-router-dom'

type ReadingCardProps = {
  riskLevel: string
  date: string
  id: string
}

function ReadingCard({ riskLevel, date, id }: ReadingCardProps) {

  const color = riskLevel === 'High' ? 'bg-red-500' : riskLevel === 'Low' ? 'bg-black' : 'bg-yellow-500'
  return (
    <li className="w-full">
      <Link to={`/result/${id}`} className='flex flex-row w-full items-center justify-between py-2 border-[3px] border-blue-500 rounded-2xl px-4 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-white hover:bg-gray-600'>
        <div>
          <p className="font-medium">{date}</p>
          {/* <p className="text-sm opacity-70">{riskLevel}</p> */}
      </div>
      <div className="p-2">
          <div className={`${color} text-white px-4 py-2 rounded-xl text-xs font-semibold `}
          >{riskLevel} Risk</div>
      </div>
      </Link>
    </li >
  )
}

type Props = {
  readings: ReadingCardProps[]
}

export default function ReadingsCard({ readings }: Props) {
  return (
    <div className="flex flex-col items-center text-black p-6 rounded-lg w-11/12">
      <h2 className="text-lg font-semibold">Recent Ratings</h2>
      <p className="text-sm opacity-70 mb-4">You have {readings.length} ratings.</p>
      <ul className="space-y-4 w-full">
        {readings.map((reading, index) => (
          <ReadingCard key={index} {...reading} />
        ))}
      </ul>
    </div>
  )
}