import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        title: "The interconnected system",
        subtitle: "Cardiovascular, renal and metabolic connections are powerful - but so is your ability to address them holistically.",
        intro: "Did you know?",
        facts: [
          {
            color: "text-teal-500",
            text: "More than 50% of patients with HF have CKD",
            ref: "2"
          },
          {
            color: "text-amber-300",
            text: "1 in 2 patients with T2D die from CVD",
            ref: "3"
          },
          {
            color: "text-[#4B3232]",
            text: "16% of patients with HF have comorbid DM and CKD",
            ref: "4"
          }
        ]
      };
    }
    
    // Robert (HFrEF)
    if (name === 'robert' || patientId === '2') {
      return {
        title: "The interconnected system",
        subtitle: "Cardiovascular, renal and metabolic connections are powerful - but so is your ability to address them holistically.",
        intro: "Did you know?",
        facts: [
          {
            color: "text-teal-500",
            text: "More than 50% of patients with HF have CKD",
            ref: "3"
          },
          {
            color: "text-amber-300",
            text: "1 in 2 patients with T2D die from CVD",
            ref: "4"
          },
          {
            color: "text-[#4B3232]",
            text: "16% of patients with HF have comorbid DM and CKD",
            ref: "5"
          }
        ]
      };
    }
    
    // Joana (T2D+CAD)
    if (name === 'joana' || patientId === '3') {
      return {
        title: "The interconnected system",
        subtitle: "Cardiovascular, renal and metabolic connections are powerful - but so is your ability to address them holistically.",
        intro: "Did you know?",
        facts: [
          {
            color: "text-neutral-500",
            text: "Patients with T2D are at 2x-4x higher risk of developing CVDs.",
            ref: "1"
          },
          {
            color: "text-amber-300",
            text: "1 in 2 patients with T2D die from CVD",
            ref: "2"
          },
          {
            color: "text-teal-500",
            text: "5 out of 10 patients with T2D develop CKD",
            ref: "3"
          },
          {
            color: "text-[#4B3232]",
            text: "16% of patients with HF have comorbid DM and CKD",
            ref: "4"
          }
        ]
      };
    }
    
    // Default content
    return {
      title: "The interconnected system",
      subtitle: "Cardiovascular, renal and metabolic connections are powerful - but so is your ability to address them holistically.",
      intro: "Did you know?",
      facts: [
        {
          color: "text-teal-500",
          text: "More than 50% of patients with HF have CKD",
          ref: "3"
        },
        {
          color: "text-amber-300",
          text: "1 in 2 patients with T2D die from CVD",
          ref: "4"
        },
        {
          color: "text-[#4B3232]",
          text: "16% of patients with HF have comorbid DM and CKD",
          ref: "5"
        }
      ]
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
            <div className="px-5 py-6">
              <p className="text-gray-700 mb-4 font-bold text-lg">
                {content.subtitle}
              </p>

              <h3 className="text-gray-700 mb-4">{content.intro}</h3>

              <div className="space-y-12 px-10 py-3">
                {content.facts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-7 h-7 flex-shrink-0 rounded-sm ${fact.color} flex items-center justify-center`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31.777"
                      height="43.219"
                      viewBox="0 0 31.777 43.219"
                    >
                      <g
                        id="Group_23643"
                        data-name="Group 23643"
                        transform="translate(-162.363 -1563)"
                      >
                        <rect
                          id="Rectangle_11259"
                          width="43.219"
                          height="31.777"
                          fill="currentColor"
                          data-name="Rectangle 11259"
                          rx="5"
                          transform="rotate(-90 884.291 721.928)"
                        ></rect>
                        <path
                          id="Line_64"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                          d="M0 0h17.727"
                          data-name="Line 64"
                          transform="translate(169.388 1571.292)"
                        ></path>
                        <path
                          id="Line_65"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                          d="M0 0h17.727"
                          data-name="Line 65"
                          transform="translate(169.388 1576.438)"
                        ></path>
                        <path
                          id="Line_66"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                          d="M0 0h17.727"
                          data-name="Line 66"
                          transform="translate(169.388 1581.585)"
                        ></path>
                        <path
                          id="Line_67"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                          d="M0 0h9.065"
                          data-name="Line 67"
                          transform="translate(169.388 1586.731)"
                        ></path>
                      </g>
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xl">
                      {fact.text}
                      <sup className="text-xs">{fact.ref}</sup>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}