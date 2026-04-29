import { mockPatients } from '@/types/patient';
import PatientDetail from '@/components/patient/PatientDetail';

export default async function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = mockPatients.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Patient not found</p>
      </div>
    );
  }

  return <PatientDetail patient={patient} />;
}