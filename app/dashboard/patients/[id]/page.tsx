'use client';

import React from 'react';
import { ArrowLeft, Heart, Activity, Droplet, Weight } from 'lucide-react';
import Link from 'next/link';

interface PatientProfileProps {
  params: {
    id: string;
  };
}

export default function PatientProfilePage({ params }: PatientProfileProps) {
  const patientId = params.id;

  // Mock patient data - in a real app, this would be fetched based on ID
  const patient = {
    id: patientId,
    name: 'Sarah Johnson',
    age: 34,
    bloodType: 'O+',
    gender: 'Female',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    admissionDate: '2024-01-15',
  };

  // Mock medical history
  const medicalHistory = [
    {
      date: '2024-01-10',
      visit: 'Routine Checkup',
      diagnosis: 'Hypertension - Mild',
      doctor: 'Dr. Michael Smith',
    },
    {
      date: '2023-12-05',
      visit: 'Follow-up Consultation',
      diagnosis: 'Medication Review',
      doctor: 'Dr. Michael Smith',
    },
    {
      date: '2023-11-20',
      visit: 'Lab Work',
      diagnosis: 'Blood Tests - Normal',
      doctor: 'Lab Technician',
    },
    {
      date: '2023-10-15',
      visit: 'General Checkup',
      diagnosis: 'Healthy - No Issues',
      doctor: 'Dr. Emily Chen',
    },
  ];

  // Mock current vitals
  const currentVitals = [
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      status: 'Normal',
    },
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      status: 'Normal',
    },
    {
      label: 'Oxygen Level',
      value: '98',
      unit: '%',
      icon: Droplet,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      status: 'Normal',
    },
    {
      label: 'Weight',
      value: '68',
      unit: 'kg',
      icon: Weight,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      status: 'Normal',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/patients"
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Patients
      </Link>

      {/* Patient Header Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {patient.name.charAt(0)}
            </div>

            {/* Patient Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600 text-lg mt-2">ID: {patient.id}</p>
              <div className="flex flex-wrap gap-6 mt-4">
                <div>
                  <p className="text-gray-600 text-sm">Age</p>
                  <p className="text-xl font-semibold text-gray-900">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Blood Type</p>
                  <p className="text-xl font-semibold text-gray-900">{patient.bloodType}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Gender</p>
                  <p className="text-xl font-semibold text-gray-900">{patient.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-6 w-full md:w-auto md:min-w-80">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-900 font-medium">{patient.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="text-gray-900 font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Admission Date</p>
                <p className="text-gray-900 font-medium">{patient.admissionDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical History and Current Vitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical History - Left Column (Wider) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>
          <div className="space-y-4">
            {medicalHistory.map((record, index) => (
              <div
                key={index}
                className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{record.visit}</p>
                    <p className="text-gray-600 text-sm mt-1">{record.diagnosis}</p>
                  </div>
                  <span className="text-gray-500 text-sm font-medium">{record.date}</span>
                </div>
                <p className="text-gray-600 text-sm">Doctor: {record.doctor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Vitals - Right Column */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Vitals</h2>
          <div className="space-y-4">
            {currentVitals.map((vital) => {
              const Icon = vital.icon;
              return (
                <div
                  key={vital.label}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-700 font-semibold text-sm">{vital.label}</p>
                    <div className={`${vital.bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${vital.color}`} />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <p className="text-3xl font-bold text-gray-900">{vital.value}</p>
                    <p className="text-gray-600 text-sm">{vital.unit}</p>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">{vital.status}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Edit Patient
        </button>
        <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
          Add Vitals
        </button>
        <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
}