'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: 'Stable' | 'Critical' | 'Recovering';
}

export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock patient data
  const patients: Patient[] = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      diagnosis: 'Hypertension',
      status: 'Stable',
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      age: 52,
      gender: 'Male',
      diagnosis: 'Type 2 Diabetes',
      status: 'Stable',
    },
    {
      id: 'P003',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      diagnosis: 'Acute Pneumonia',
      status: 'Critical',
    },
    {
      id: 'P004',
      name: 'James Wilson',
      age: 67,
      gender: 'Male',
      diagnosis: 'Heart Disease',
      status: 'Critical',
    },
    {
      id: 'P005',
      name: 'Jessica Martinez',
      age: 45,
      gender: 'Female',
      diagnosis: 'Post-Surgery Recovery',
      status: 'Recovering',
    },
    {
      id: 'P006',
      name: 'Robert Brown',
      age: 56,
      gender: 'Male',
      diagnosis: 'Arthritis',
      status: 'Stable',
    },
    {
      id: 'P007',
      name: 'Lisa Anderson',
      age: 38,
      gender: 'Female',
      diagnosis: 'Fractured Leg',
      status: 'Recovering',
    },
    {
      id: 'P008',
      name: 'David Thompson',
      age: 71,
      gender: 'Male',
      diagnosis: 'Kidney Disease',
      status: 'Critical',
    },
  ];

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Get status badge styling
  const getStatusStyles = (status: Patient['status']) => {
    switch (status) {
      case 'Stable':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: CheckCircle,
        };
      case 'Critical':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: AlertCircle,
        };
      case 'Recovering':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: Clock,
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: CheckCircle,
        };
    }
  };

  // Handle row click - navigate to patient detail page
  const handleRowClick = (patientId: string) => {
    router.push(`/dashboard/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600 mt-2">Manage and view all patient records</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gender</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Diagnosis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => {
                  const statusStyles = getStatusStyles(patient.status);
                  const StatusIcon = statusStyles.icon;
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => handleRowClick(patient.id)}
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{patient.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.diagnosis}</td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${statusStyles.bgColor} ${statusStyles.textColor}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {patient.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="text-blue-500 hover:text-blue-700 font-semibold text-sm transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-gray-600 font-medium">No patients found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{filteredPatients.length}</span> of{' '}
        <span className="font-semibold">{patients.length}</span> patients
      </div>
    </div>
  );
}