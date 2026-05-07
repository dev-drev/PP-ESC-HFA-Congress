import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface InterconnectedSystemAccordionProps {
  isOpen: boolean;
  patientId?: string;
  patientName?: string;
}

export default function InterconnectedSystemAccordion({
  isOpen,
  patientId,
  patientName,
}: InterconnectedSystemAccordionProps) {
  const [expanded, setExpanded] = useState(isOpen);

  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);

  // Patient-specific content
  const getInterconnectedContent = () => {
    const name = patientName?.toLowerCase();
    
    // Linda (HFpEF)
    if (name === 'linda' || patientId === '1') {
      return {
        title: "KDIGO Digital Heatmap",
        subtitle: "Do you want to visualize your patients' risk for adverse CV and kidney outcomes by entering their uACR and eGFR values?",
        intro: "Scan and Learn more",
      };
    }
    
    // Robert (HFrEF)
    if (name === 'robert' || patientId === '2') {
      return {
        title: "KDIGO Digital Heatmap",
        subtitle: "Do you want to visualize your patients' risk for adverse CV and kidney outcomes by entering their uACR and eGFR values?",
        intro: "Scan and Learn more",
      };
    }
    
    // Joana (T2D+CAD)
    if (name === 'joana' || patientId === '3') {
      return {
        title: "KDIGO Digital Heatmap",
        subtitle: "Do you want to visualize your patients' risk for adverse CV and kidney outcomes by entering their uACR and eGFR values?",
        intro: "Scan and Learn more",
      };
    }
    
    // Default content
    return {
      title: "KDIGO Digital Heatmap",
      subtitle: "Do you want to visualize your patients' risk for adverse CV and kidney outcomes by entering their uACR and eGFR values?",
      intro: "Scan and Learn more",
    };
  };

  const content = getInterconnectedContent();

  return (
    <div className="overflow-hidden">
      <button
        className="w-full flex items-center bg-white/80 border border-white text-[#585858] backdrop-blur-lg text-[32px] font-bold px-10 py-4 rounded-4xl"
      >
        <h2 className="text-[32px] text-[#585858] font-bold">
          {content.title}
        </h2>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
         
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
          
            
            className="overflow-hidden"
            style={{ willChange: 'height, opacity' }}
          >
            <div className="px-5  py-6 lg:text-center ">
              <p className="text-gray-700 mb-4 font-bold text-lg">
                {content.subtitle}
              </p>

              <h3 className="text-gray-700 mb-4">{content.intro}</h3>

              <div className="px-6 py-3 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                
                  <Image
                  quality={100}
                    src="/PP-new/guidelines-vcf.png"
                    alt="Placeholder image 2"
                    title="Placeholder image 2"
                    width={420}
                    height={260}
                    className="w-full h-full rounded-lg object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-700 text-sm lg:px-10">This interactive risk calculator - developed in collaboration with Boehringer Ingelheim and KDIGO - is intended for informational purposes only and does not constitute medical advice or recommendations. It is not a substitute for professional medical advice, diagnosis, or treatment and is not a treatment decision tool. Practitioners should use their own clinical judgment when diagnosing and treating patients.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}