'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JamesFlow3Age70Page() {
  const patient = mockPatients.find((p) => p.name === 'James') || mockPatients[3];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2040}
        age={70}
        quote="My kidneys are in worse shape. I'm more tired than ever, my legs are often swollen, and I'm short of breath. It's getting harder, and I'm worried I might need dialysis."
        backgroundImage="/backgrounds/james-70c.jpg"
        currentStepImage="/next-steps/james/step8.png"
        sglt2iAccordionTitle="Initiate SGLT2i"
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
