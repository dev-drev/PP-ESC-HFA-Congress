'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JamesFlow1Age70Page() {
  const patient = mockPatients.find((p) => p.name === 'James') || mockPatients[3];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        age={70}
        quote="My kidney function's not what it was, but I've managed to avoid any serious setbacks."
        backgroundImage="/backgrounds/james/01A.jpg"
        currentStepImage="/next-steps/james/step9.png"
        sglt2iAccordionTitle="Commit to standing against CV risk."
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
