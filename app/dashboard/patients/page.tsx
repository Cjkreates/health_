import { PrismaClient } from '@prisma/client';
import PatientClient from './client'; // We will create this next

const prisma = new PrismaClient();

// This is a Server Component (fetches data directly)
export default async function PatientsPage() {
  // Fetch real data from Supabase
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Pass data to the Client Component
  return <PatientClient initialPatients={patients} />;
}