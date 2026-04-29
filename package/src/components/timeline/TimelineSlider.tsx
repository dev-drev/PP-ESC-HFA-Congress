import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TimelineSliderProps {
  currentYear: number;
  minYear?: number;
  maxYear?: number;
  onChange?: (year: number) => void;
}

export default function TimelineSlider({
  currentYear = 2025,
  minYear = 2020,
  maxYear = 2035,
  onChange,
}: TimelineSliderProps) {
  const isInitialYear = currentYear === 2025;

  const handleTimelineClick = () => {
    if (onChange && isInitialYear) {
      onChange(2030);
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isInitialYear ? (
          <motion.div 
       
        className="relative z-10 w-full max-w-full mx-3 h-[146px]"
      >
        <div className="background-timeline-1"></div>
        <div className="background-timeline-2"></div>
        <Image
          src="/timeline.svg"
          alt="Timeline"
          title="Timeline"
          width={1826}
          height={146}
          className="w-auto mx-auto px-8"
        />
      </motion.div>
        ) : (
           <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-full mx-3 h-[146px]"
      >
        <div className="background-timeline-1"></div>
        <div className="background-timeline-2"></div>
        <Image
          src="/timeline.svg"
          alt="Timeline"
          title="Timeline"
          width={1826}
          height={146}
          className="w-auto mx-auto px-8"
        />
      </motion.div>
        )}
      </AnimatePresence>

  
    </div>
  );
}