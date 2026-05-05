'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JoanaAddSGLT2iCasePage() {
  const patient = mockPatients.find((p) => p.name === 'Joana') || mockPatients[2];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2036}
         age={67}
        quote="It's reassuring to know that the steps my doctor and I took years ago are still helping me stay stable today."
        backgroundImage="/backgrounds/03A.jpg"
        currentStepImage="/next-steps/joana/final/step8.png"
        sglt2iAccordionTitle="Commit to standing against CV risk."
        showClinicalReasoning={true}
        endActions={[
          { id: 'go-back', text: 'Go Back' },
          { id: 'restart', text: 'Restart' },
          { id: 'select-another', text: 'Select another patient' }
        ]}
      />
    </ClientWrapper>
  );
}