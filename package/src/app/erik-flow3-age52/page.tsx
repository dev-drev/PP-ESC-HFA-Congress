'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function ErikFlow3Age52Page() {
  const patient = mockPatients.find((p) => p.name === 'Erik') || mockPatients[4];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        age={70}
        quote="I never thought I’d end up here. My kidneys and heart have failed, and now I’m on dialysis and waiting for a kidney transplant."
        backgroundImage="/backgrounds/erik/02B.jpg"
        currentStepImage="/next-steps/erik/step4.png"
        sglt2iAccordionTitle="Continue"
        // sglt2iAccordionTitle="Disease progression"
        endActions={[
          { id: 'go-back', text: 'Travel back in time' },
          { id: 'restart', text: 'Restart' },
          { id: 'select-another', text: 'Select another patient' }
        ]}
      />
    </ClientWrapper>
  );
}
