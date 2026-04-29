'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface ClinicalReasoningSlide {
  id: string;
  content: React.ReactNode;
}

interface ClinicalReasoningSlidesProps {
  patientId: string;
  slides: ClinicalReasoningSlide[];
  slideKey?: string;
}

export default function ClinicalReasoningSlides({
  patientId,
  slides,
  slideKey = 'default',
}: ClinicalReasoningSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold && currentSlide > 0) {
      prevSlide();
    }
  };

  return (
    <div className="relative py-4">
      <div className="relative">
        <motion.div
          className="w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
        >
          {slides[currentSlide].content}
        </motion.div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-gray-600' : 'bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}