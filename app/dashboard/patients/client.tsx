"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Filter, X } from "lucide-react";
import { createPatient } from "./actions"; // Import our new server action

// Define the shape of our Patient data
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: string;
  createdAt: Date;
}

export default function PatientClient({ initialPatients }: { initialPatients: Patient[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  // Filter patients
  const filteredPatients = initialPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-slate-600">ID</th>
              <th className="p-4 font-semibold text-slate-600">Name</th>
              <th className="p-4 font-semibold text-slate-600">Age</th>
              <th className="p-4 font-semibold text-slate-600">Diagnosis</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition"
                onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
              >
                <td className="p-4 text-slate-500">#{patient.id.slice(0, 5)}</td>
                <td className="p-4 font-medium text-slate-900">{patient.name}</td>
                <td className="p-4 text-slate-600">{patient.age}</td>
                <td className="p-4 text-slate-600">{patient.diagnosis}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === "Stable"
                        ? "bg-green-100 text-green-700"
                        : patient.status === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-4 text-blue-600 font-medium hover:underline">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD PATIENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Patient</h2>
<button 
  onClick={() => setIsModalOpen(false)} 
  aria-label="Close modal" // <--- This fixes the error
  className="p-1 hover:bg-slate-100 rounded-full transition"
>
  <X className="text-slate-400 hover:text-slate-600" />
</button>
            </div>
            
            <form action={async (formData) => {
    await createPatient(formData);
    setIsModalOpen(false);
  }}>
    <div className="space-y-3">
      <input 
        name="name" 
        placeholder="Full Name" 
        required 
        aria-label="Full Name" 
        className="w-full p-2 border rounded-lg" 
      />
      
      <input 
        name="age" 
        type="number" 
        placeholder="Age" 
        required 
        aria-label="Age"
        className="w-full p-2 border rounded-lg" 
      />
      
      <select 
        name="gender" 
        aria-label="Gender" 
        className="w-full p-2 border rounded-lg"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      
      <input 
        name="diagnosis" 
        placeholder="Diagnosis (e.g., Flu)" 
        required 
        aria-label="Diagnosis"
        className="w-full p-2 border rounded-lg" 
      />
      
      <select 
        name="status" 
        aria-label="Patient Status" 
        className="w-full p-2 border rounded-lg"
      >
        <option value="Stable">Stable</option>
        <option value="Critical">Critical</option>
        <option value="Recovering">Recovering</option>
      </select>
      
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 mt-4">
        Save Patient
      </button>
    </div>
</form>
          </div>
        </div>
      )}
    </div>
  );
}