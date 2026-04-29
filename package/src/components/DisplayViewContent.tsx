'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { PresentationState } from '@/types'
import Screensaver from './Screensaver'

export default function DisplayViewContent() {
  const searchParams = useSearchParams()
  const sessionCode = searchParams.get('session')
  const [state, setState] = useState<PresentationState>({ slide: 1, timestamp: 0 })
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    setIsConnected(true)
    setIsLoading(false)
  }, [sessionCode])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">Verbinde mit Session {sessionCode}...</p>
        </div>
      </div>
    )
  }

  if (connectionError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Verbindung fehlgeschlagen</h2>
          <p className="text-gray-300 mb-6">{connectionError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Screensaver isController={false} />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-white">Display Mode</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Session:</span>
                <span className="font-mono text-sm font-medium text-blue-400">
                  {sessionCode}
                </span>
                {isConnected && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-900 text-green-300 rounded-full">
                    ✓ Verbunden
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Slide {state.slide}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.slide}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="bg-white rounded-2xl shadow-2xl p-16 text-center min-h-96"
            >
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-6xl font-bold text-gray-800 mb-12"
              >
                Slide {state.slide}
              </motion.h1>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl text-gray-600 space-y-6"
              >
               
                <p>This is the content of slide {state.slide}.</p>
     
                
             
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>Letztes Update: {new Date(state.timestamp).toLocaleTimeString()}</span>
            <span>•</span>
            <span>Vollbildmodus: F11</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}