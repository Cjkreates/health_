'use client';

import React from 'react';
import { Users, Calendar, FileText, DollarSign, ArrowUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,204',
      icon: Users,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: '+12.5%',
    },
    {
      title: 'Appointments Today',
      value: '8',
      icon: Calendar,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      change: '+5.2%',
    },
    {
      title: 'Pending Reports',
      value: '3',
      icon: FileText,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
      change: '-2.1%',
    },
    {
      title: 'Earnings',
      value: '$4k',
      icon: DollarSign,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: '+8.3%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}>
                  <Icon className={`w-7 h-7 ${stat.textColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                <span className="text-gray-500 text-sm">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h2>
          <div className="space-y-3">
            {[
              { patient: 'Sarah Johnson', time: '10:00 AM', status: 'Confirmed' },
              { patient: 'Michael Chen', time: '11:30 AM', status: 'Confirmed' },
              { patient: 'Emily Davis', time: '2:00 PM', status: 'Pending' },
              { patient: 'James Wilson', time: '3:30 PM', status: 'Confirmed' },
            ].map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-blue-500"
              >
                <div>
                  <p className="font-semibold text-gray-900">{appointment.patient}</p>
                  <p className="text-gray-600 text-sm">{appointment.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'Confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors">
              Schedule Appointment
            </button>
            <button className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors">
              Add Patient
            </button>
            <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}