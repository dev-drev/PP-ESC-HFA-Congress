import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeartToggleSwitchProps {
  onChange: (isActive: boolean) => void;
  isActive?: boolean;
  disabled?: boolean;
}

export default function HeartToggleSwitch({
  onChange,
  isActive = false,
  disabled = false,
}: HeartToggleSwitchProps) {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !active;
    setActive(newState);
    onChange(newState);
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 lg:p-3 rounded-full transition-colors duration-300 ${
        active ? 'bg-[#FF6767]/90 border border-[#FF6767]' : 'bg-white/10 backdrop-blur-sm border border-white/20'
      } ${disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
      style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}
      onClick={handleToggle}
    >
      <div className="relative w-7 h-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Group_23750"
          width="41.221"
          height="62.547"
          data-name="Group 23750"
          viewBox="0 0 41.221 62.547"
          className={`transition-colors duration-300 w-7 h-7 ${
            active ? 'text-white' : 'text-white'
          }`}
        >
          <path
            id="Path_27413"
            fill="currentColor"
            d="M36.31 11.809v5.3a1.4 1.4 0 0 1-1.41 1.405h-5.276a2 2 0 0 0-1.518.691c-1.815 2.109-6.5 8.5.487 11.456 8.432 3.573 12.29 2.43 12.433 9.146s.715 15.149-1.143 18.579-6.431 5-12.433 3.715-15.863-3.573-19.436-11.433S2.012 37.092 5.3 29.8c2.449-5.431 9.024-13.321 12.217-16.991a6.06 6.06 0 0 1 4.421-2.082L34.87 10.4a1.4 1.4 0 0 1 1.44 1.4"
            data-name="Path 27413"
          ></path>
          <path
            id="Path_27414"
            fill="currentColor"
            d="M9.841 18.832c-1.862 2.356-7.432 9.782-7.983 14.941a.321.321 0 0 1-.622.071 20.1 20.1 0 0 1-.51-12.186C2.869 14.369 3.3 13.226 3.584 7.51l.286-5.717h6.288l.268 15.3a2.73 2.73 0 0 1-.585 1.741"
            data-name="Path 27414"
          ></path>
          <path
            id="Path_27415"
            fill="currentColor"
            d="m12 15.356.051-3.031a5.65 5.65 0 0 1 .822-2.855 7.5 7.5 0 0 1 1.541-1.9c1.286-1.026 1.612-1.062 1.612-3.07 0-1.67-.05-3.669-.067-4.3a.193.193 0 0 1 .195-.2l3.1.021.382 4.4a.76.76 0 0 0 .632.7c.3.051.66.185 1.057.247.461.072.448-3.9.44-4.718a.144.144 0 0 1 .145-.145h1.2a.04.04 0 0 1 .039.039l.036 5.24a.16.16 0 0 0 .081.141 33 33 0 0 1 2.911 1.923c.631.582-2.079.779-2.094.781l-2.183.033a6.51 6.51 0 0 0-4.842 1.592l-4.69 5.282c-.238.28-.377.182-.371-.186"
            data-name="Path 27415"
          ></path>
          <path
            id="Path_27416"
            fill="currentColor"
            d="M39.693 32.743a.1.1 0 0 1-.138.124c-1.119-.452-6.741-2.719-9.508-3.831-2.554-1.026-3.8-2.868-2.36-5.54l1.232-2.282a.426.426 0 0 1 .593-.166c1.409.837 6.3 3.867 7.813 6.424a25 25 0 0 1 2.368 5.271"
            data-name="Path 27416"
          ></path>
        </svg>
      </div>

      <div
        className={`relative w-14 h-7 rounded-full p-1 ${
          active ? 'bg-white' : 'bg-[#b5d0d1]'
        }`}
      >
        <motion.div
          className={`absolute top-1 w-5 h-5 rounded-full ${
            active ? 'bg-[#FF6767]' : 'bg-white'
          }`}
          animate={{
            x: active ? 26 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}