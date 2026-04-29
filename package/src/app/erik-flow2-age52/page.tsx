'use client';

import { mockPatients } from '@/types/patient';
import CaseResult from '@/components/patient/CaseResult';
import ClientWrapper from '@/components/ClientWrapper';

export default function ErikFlow2Age52Page() {
  const patient = mockPatients.find((p) => p.name === 'Erik') || mockPatients[4];

  return (
    <ClientWrapper>
      <CaseResult
        patient={patient}
        year={2035}
        age={70}
        quote="My kidney disease has progressed, and now I’ve got heart issues too. Life isn’t easy, but I’m managing as best I can."
        backgroundImage="/backgrounds/erik/01C.jpg"
        currentStepImage="/next-steps/erik/step3.png"
        sglt2iAccordionTitle="The earlier, the better"
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
