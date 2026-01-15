'use client';

import React, { use, useState } from 'react';
import { ArrowLeft, Heart, Activity, Droplet, Weight, FileText, Check, Eye } from 'lucide-react';
import Link from 'next/link';

interface PatientProfileProps {
  params: Promise<{
    id: string;
  }>;
}

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface PastNote {
  id: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export default function PatientProfilePage({ params }: PatientProfileProps) {
  const { id: patientId } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'clinical-notes'>('overview');
  const [soapNote, setSOAPNote] = useState<SOAPNote>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });
  const [showSaveAlert, setShowSaveAlert] = useState(false);

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

  // Mock past SOAP notes
  const pastNotes: PastNote[] = [
    {
      id: '1',
      date: 'Oct 12, 2024',
      subjective: 'Patient reports recurring lower back pain, especially after standing for prolonged periods.',
      objective: 'Mild muscle tension noted on palpation. No neurological deficits observed.',
      assessment: 'Chronic lower back pain - likely mechanical origin.',
      plan: 'Physical therapy referral, NSAIDs as needed, ergonomic assessment.',
    },
    {
      id: '2',
      date: 'Sep 18, 2024',
      subjective: 'Patient complains of persistent headaches for the past week. States they are worse with stress.',
      objective: 'Blood pressure normal. No focal neurological findings. MRI ordered.',
      assessment: 'Tension headaches with possible migraine component.',
      plan: 'Preventive medication prescribed. Stress management counseling recommended.',
    },
    {
      id: '3',
      date: 'Aug 22, 2024',
      subjective: 'Follow-up visit for hypertension management. Patient reports good medication compliance.',
      objective: 'Blood pressure 118/76 mmHg. ECG normal. Lipid panel within normal limits.',
      assessment: 'Hypertension well-controlled on current medication regimen.',
      plan: 'Continue current antihypertensive therapy. Repeat labs in 3 months.',
    },
  ];

  const handleSOAPChange = (field: keyof SOAPNote, value: string) => {
    setSOAPNote((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveNote = () => {
    console.log('SOAP Note Saved:', soapNote);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

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

      {/* Medical Notes Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('clinical-notes')}
            className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'clinical-notes'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Clinical Notes (SOAP)
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Age</p>
                <p className="text-2xl font-bold text-gray-900">{patient.age}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Blood Type</p>
                <p className="text-2xl font-bold text-gray-900">{patient.bloodType}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Gender</p>
                <p className="text-2xl font-bold text-gray-900">{patient.gender}</p>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Notes Tab */}
        {activeTab === 'clinical-notes' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">SOAP Note</h3>
              <p className="text-gray-600 text-sm mb-6">
                Document patient encounter using the SOAP framework
              </p>
            </div>

            {/* Save Alert */}
            {showSaveAlert && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Saved Successfully</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Subjective */}
              <div>
                <label htmlFor="subjective" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subjective
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Patient's description of symptoms and history
                </p>
                <textarea
                  id="subjective"
                  value={soapNote.subjective}
                  onChange={(e) => handleSOAPChange('subjective', e.target.value)}
                  placeholder="e.g., Patient reports experiencing mild headaches for the past 2 days..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* Objective */}
              <div>
                <label htmlFor="objective" className="block text-sm font-semibold text-gray-900 mb-2">
                  Objective
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Clinical observations and test results
                </p>
                <textarea
                  id="objective"
                  value={soapNote.objective}
                  onChange={(e) => handleSOAPChange('objective', e.target.value)}
                  placeholder="e.g., Blood pressure 120/80 mmHg, Heart rate 72 bpm, Temperature 98.6°F..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* Assessment */}
              <div>
                <label htmlFor="assessment" className="block text-sm font-semibold text-gray-900 mb-2">
                  Assessment
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Clinical impressions and diagnoses
                </p>
                <textarea
                  id="assessment"
                  value={soapNote.assessment}
                  onChange={(e) => handleSOAPChange('assessment', e.target.value)}
                  placeholder="e.g., Tension-type headache, likely caused by stress and poor sleep..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* Plan */}
              <div>
                <label htmlFor="plan" className="block text-sm font-semibold text-gray-900 mb-2">
                  Plan
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Treatment plan and follow-up recommendations
                </p>
                <textarea
                  id="plan"
                  value={soapNote.plan}
                  onChange={(e) => handleSOAPChange('plan', e.target.value)}
                  placeholder="e.g., Prescribe ibuprofen 400mg every 6 hours, recommend rest and hydration, follow-up in 1 week if symptoms persist..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveNote}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Save Note
              </button>
            </div>

            {/* History Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Past Notes</h3>
              <div className="space-y-4">
                {pastNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 font-medium mb-2">{note.date}</p>
                        <p className="text-gray-900 font-semibold line-clamp-2">{note.assessment}</p>
                      </div>
                      <button className="ml-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
                        <Eye className="w-4 h-4" />
                        View Full
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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