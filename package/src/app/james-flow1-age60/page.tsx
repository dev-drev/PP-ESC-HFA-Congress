'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function JamesFlow1Age60Page() {
  const patient = mockPatients.find((p) => p.name === 'James') || mockPatients[3];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2030}
        age={60}
        quote="So far, my CKD hasn't really affected my day-to-day life – and my blood pressure seems under control too."
        backgroundImage="/backgrounds/james/02C.jpg"
        currentStepImage="/next-steps/james/step2.png"
        sglt2iAccordionTitle="Sound clinical reasoning!"
        showClinicalReasoning={true}
        endActions={[
          { id: 'proceed', text: 'Proceed' },
          { id: 'go-back', text: 'Travel back in time' },
          { id: 'restart', text: 'Restart' }
        ]}
      />
    </ClientWrapper>
  );
}
