'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function ErikFlow1Age52Page() {
  const patient = mockPatients.find((p) => p.name === 'Erik') || mockPatients[4];
 

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        age={70}
        quote="My kidney function has declined over the years, but it could be worse. I have swollen legs and feel weaker, but it’s not holding me back too much."
        backgroundImage="/backgrounds/erik/02A.jpg"
        currentStepImage="/next-steps/erik/step2.png"
        sglt2iAccordionTitle="Sound clinical reasoning!"
        showClinicalReasoning={true}
        endActions={[
          { id: 'go-back', text: 'Travel back in time' },
          { id: 'restart', text: 'Restart' },
          { id: 'select-another', text: 'Select another patient' }
        ]}
      />
    </ClientWrapper>
  );
}
