'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JoanaOptimizeCasePage() {
  const patient = mockPatients.find((p) => p.name === 'Joana') || mockPatients[2];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
        age={67}
        quote="Some days are better than others, but I’m learning to live with my both heart and kidney issues"
        backgroundImage="/backgrounds/03B.jpg"
        showClinicalReasoning={false}
        currentStepImage="/next-steps/joana/final/step9.png"
        sglt2iAccordionTitle="The earlier, the better."
        endActions={[
          { id: 'go-back', text: 'Go Back' },
          { id: 'restart', text: 'Restart' },
          { id: 'select-another', text: 'Select another patient' }
        ]}
      />
    </ClientWrapper>
  );
}