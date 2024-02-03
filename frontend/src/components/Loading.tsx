import React from 'react'
import Navbar from './Navbar'

type Props = {
  spinner?: boolean
  text?: string
}

export default function Loading({ spinner, text }: Props) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* pink spinner */}
      {spinner && <div className="w-11/12 h-96 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>}
      {text && <div className="text-2xl font-bold text-black">{text}</div>}

      <Navbar />

    </div>
  )
}