'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ScreensaverProps {
  isController?: boolean
}

export default function Screensaver({ isController = false }: ScreensaverProps) {
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const router = useRouter()

  const INACTIVITY_TIMEOUT = 2 * 60 * 1000 // 2 minutes

  const videoSrc = '/250819_ScreensaverFINAL_1920x1080.mp4'

  // Handle inactivity detection
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now()
      const timeSinceActivity = now - lastActivityRef.current

      if (timeSinceActivity >= INACTIVITY_TIMEOUT && !isActive) {
        setIsActive(true)
      }
    }

    const handleActivity = () => {
      lastActivityRef.current = Date.now()

      if (isActive) {
        setIsActive(false)
      }
    }

    const events = [
      'touchstart',
      'touchend',
      'click',
      'mousedown',
      'keypress'
    ]

    events.forEach(event => {
      document.addEventListener(event, handleActivity)
    })

    const intervalId = setInterval(checkInactivity, 1000)

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      clearInterval(intervalId)
    }
  }, [isActive, INACTIVITY_TIMEOUT])

  // Handle video playback
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing video:', error)
        }
      })
    }
  }, [isActive])

  const handleScreensaverClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    lastActivityRef.current = Date.now()
    setIsActive(false)
    router.push('/')
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black cursor-pointer"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999
          }}
          onClick={handleScreensaverClick}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
         
        </motion.div>
      )}
    </AnimatePresence>
  )
}