import React from 'react';
import { Heart, Stethoscope, Calendar, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold text-blue-600">HealthOS</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Healthcare <span className="text-blue-500">Reimagined</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Streamlined medical management system designed for modern healthcare providers. Manage patient records, appointments, and doctors all in one place.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Get Started
          </button>
          <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Key Features
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            Everything you need to manage your healthcare facility efficiently
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Patient Records Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient Records</h3>
              <p className="text-gray-600 leading-relaxed">
                Securely store and access comprehensive patient medical histories, test results, and treatment plans in one centralized location.
              </p>
            </div>

            {/* Appointments Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Appointments</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage appointment schedules effortlessly with automated reminders, real-time availability, and seamless patient booking.
              </p>
            </div>

            {/* Doctors Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Stethoscope className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Doctors</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage doctor profiles, specializations, schedules, and credentials. Keep your medical staff information organized and up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Heart className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-blue-600">HealthOS</span>
          </div>
          <p className="text-gray-600">
            © 2026 HealthOS. Modern Healthcare Management System.
          </p>
        </div>
      </footer>
    </div>
  );
}
