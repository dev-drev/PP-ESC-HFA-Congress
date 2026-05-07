'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { mockPatients } from '@/types/patient'

export default function LockedRobertsView() {
  const router = useRouter()

  const robert = mockPatients.find(p => p.name === 'Robert')

  const handleStateSelect = (stateKey: string) => {
    router.push(`/robert-future?state=${stateKey}`)
  }

  return (
    <div className="min-h-screen relative bg-[#1a1a1a] flex flex-col items-center justify-center p-8">
      

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-light text-white tracking-wide mb-4">
          Select a future for <span className="font-bold text-[#FFBF00]">ROBERT</span>
        </h1>
        <p className="text-2xl text-white/80">
          Choose between monitoring or prescribing SGLT2i
        </p>
      </motion.div>

      <div className="flex gap-24 items-center justify-center">
        {/* Monitoring Path */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => handleStateSelect('monitoring_ecg')}
          className="relative cursor-pointer group"
        >
          <div className="text-center">
            <h3 className="text-2xl font-medium text-white mb-6">Monitoring ECG</h3>
            <div className="relative">
              <Image
                  quality={100}
                src="/characters/02B.png"
                alt="Robert - Monitoring"
                title="Robert - Monitoring"
                width={300}
                height={400}
                className="relative z-10 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-red-500/20 rounded-full blur-xl"></div>
            </div>
            <div className="mt-6 text-left max-w-xs">
              <p className="text-sm text-red-400 font-medium mb-2">NYHA Class III</p>
              <p className="text-sm text-white/60">Progressed symptoms, increased fatigue and breathlessness</p>
            </div>
          </div>
        </motion.div>

        {/* Center Robert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative">
            <Image
                  quality={100}
              src="/characters/02.png"
              alt="Robert - Current"
              title="Robert - Current"
              width={350}
              height={450}
              className="relative z-10 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-sm text-white/60">Current State</p>
              <p className="text-xs text-white/40">NYHA Class II</p>
            </div>
          </div>
        </motion.div>

        {/* SGLT2i Path */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => handleStateSelect('prescribe_sglt2i')}
          className="relative cursor-pointer group"
        >
          <div className="text-center">
            <h3 className="text-2xl font-medium text-white mb-6">Prescribe SGLT2i</h3>
            <div className="relative">
              <Image
                  quality={100}
                src="/characters/02A.png"
                alt="Robert - SGLT2i"
                title="Robert - SGLT2i"
                width={300}
                height={400}
                className="relative z-10 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-green-500/20 rounded-full blur-xl"></div>
            </div>
            <div className="mt-6 text-left max-w-xs">
              <p className="text-sm text-green-400 font-medium mb-2">NYHA Class II</p>
              <p className="text-sm text-white/60">Maintained function, improved quality of life</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-white/40">
          Click on a future to proceed
        </p>
      </motion.div>
    </div>
  )
}