'use client'

import { useEffect, useState } from 'react'

export default function TestScreensaver() {
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    console.log('TestScreensaver mounted')
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newValue = prev - 1
        console.log('Countdown:', newValue)
        if (newValue <= 0) {
          console.log('Activating screensaver!')
          setShowScreensaver(true)
          clearInterval(timer)
        }
        return newValue
      })
    }, 1000)

    const handleClick = () => {
      console.log('Click detected, hiding screensaver')
      setShowScreensaver(false)
      setCountdown(3)
    }

    document.addEventListener('click', handleClick)

    return () => {
      clearInterval(timer)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  if (!showScreensaver) {
    return (
      <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-4 py-2 rounded">
        Screensaver in: {countdown}s
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-blue-600 flex items-center justify-center cursor-pointer"
      onClick={() => {
        setShowScreensaver(false)
        setCountdown(3)
      }}
    >
      <div className="text-white text-6xl font-bold">
        SCREENSAVER ACTIVE
        <p className="text-2xl mt-4">Click anywhere to dismiss</p>
      </div>
    </div>
  )
}