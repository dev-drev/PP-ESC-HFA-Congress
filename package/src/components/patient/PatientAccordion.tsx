import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PatientAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  titleColor?: string;
  contentColor?: string;
}

export default function PatientAccordion({
  title,
  children,
  isOpen,
  defaultOpen = false,
  onToggle,
  titleColor = 'bg-teal-500',
  contentColor = 'bg-white',
}: PatientAccordionProps) {
  const [expanded, setExpanded] = useState(isOpen ?? defaultOpen);

  useEffect(() => {
    if (isOpen !== undefined) {
      setExpanded(isOpen);
    }
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !expanded;
    setExpanded(newState);
    onToggle?.(newState);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-6 lg:px-10 py-4 rounded-xl 2xl:rounded-4xl ${titleColor} ${
          titleColor.includes('bg-white') ? 'text-[#585858]' : 'text-white'
        } backdrop-blur-lg hover:opacity-90 transition-opacity`}
      >
        <h2 className="text-[20px] lg:text-[32px] font-bold">{title}</h2>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-down lg:w-8 lg:h-8"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className=" ">
              <div className="px-6 lg:px-10 py-6 pt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}