'use client'

interface TimelineProps {
  activeYear?: number
  patientName?: string
}

export default function TimelineComponent({ activeYear = 2025, patientName }: TimelineProps) {
  // For James and Erik, use 2040 as the end year
  const years = (patientName === 'James' || patientName === 'Erik')
    ? [2025, 2030, 2040]
    : [2025, 2030, 2035]  // Default years for other patients

  return (
    <div className="relative z-30 flex w-full justify-center pt-4 pb-4 lg:pb-16 lg:pt-4 px-2 lg:px-4">
      <div className="2xl:min-w-[500px] mx-auto inline-flex items-center gap-1 2xl:gap-3 justify-center px-3 py-2 2xl:px-6 2xl:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
        {years.map((year, index) => (
          <div key={year} className="flex items-center gap-1 lg:gap-2">
            {index > 0 && (
              <div className="w-6 2xl:w-16 h-[2px] bg-white/30 mx-1 lg:mx-2" />
            )}
            <div className="flex items-center gap-1 lg:gap-2">
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeYear === year
                    ? 'w-2 h-2 lg:w-3 lg:h-3 bg-[#ffbf00] shadow-[0_0_10px_rgba(255,191,0,0.8)] lg:shadow-[0_0_15px_rgba(255,191,0,0.8)]'
                    : 'w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white/50'
                }`}
              />
              <span
                className={`font-lato transition-all duration-300 whitespace-nowrap ${
                  activeYear === year
                    ? 'text-[#ffbf00] font-bold text-sm 2xl:text-2xl'
                    : 'text-white/60 font-normal text-xs 2xl:text-lg'
                }`}
                style={{
                  filter: activeYear === year ? 'drop-shadow(0 0 8px rgba(255,191,0,0.6))' : 'none',
                  letterSpacing: '0.02em'
                }}
              >
                {year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
