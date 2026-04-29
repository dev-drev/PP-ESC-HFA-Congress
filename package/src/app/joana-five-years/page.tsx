'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';

export default function JoanaFiveYearsPage() {
  const patient = mockPatients.find((p) => p.name === 'Joana') || mockPatients[2];

  return (
    <CaseResult
      patient={patient}
      year={2035}
      quote="I was recently hospitalised for heart failure. Breathing is harder now, and I feel like I’m not as independent as I used to be."
      backgroundImage="/backgrounds/03C.jpg"
      currentStepImage="/next-steps/joana/final/step10.png"
      showClinicalReasoning={false}
       sglt2iAccordionTitle="Don't miss the moment"
      endActions={[
        { id: 'go-back', text: 'Go back' },
        { id: 'restart', text: 'Restart' },
        { id: 'select-another', text: 'Select another patient' }
      ]}
    />
  );
}