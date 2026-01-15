'use client';

import { useState } from 'react';
import { Calendar, Plus, Clock, User, X } from 'lucide-react';

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  type: 'Check-up' | 'Surgery' | 'Follow-up';
  status: 'Confirmed' | 'Pending' | 'Completed';
}

interface UpcomingRequest {
  id: string;
  patientName: string;
  date: string;
}

interface NewAppointmentForm {
  patientName: string;
  time: string;
  reason: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    time: '9:00 AM',
    patientName: 'John Smith',
    type: 'Check-up',
    status: 'Confirmed',
  },
  {
    id: '2',
    time: '11:30 AM',
    patientName: 'Sarah Johnson',
    type: 'Surgery',
    status: 'Confirmed',
  },
  {
    id: '3',
    time: '2:00 PM',
    patientName: 'Mike Davis',
    type: 'Follow-up',
    status: 'Pending',
  },
];

const mockUpcomingRequests: UpcomingRequest[] = [
  { id: '1', patientName: 'Emily Wilson', date: 'Jan 16' },
  { id: '2', patientName: 'Robert Brown', date: 'Jan 17' },
  { id: '3', patientName: 'Lisa Anderson', date: 'Jan 18' },
];

const timeSlots = Array.from({ length: 10 }, (_, i) => {
  const hour = 8 + i;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${ampm}`;
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Check-up':
      return 'bg-blue-50 border-blue-200';
    case 'Surgery':
      return 'bg-red-50 border-red-200';
    case 'Follow-up':
      return 'bg-purple-50 border-purple-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<NewAppointmentForm>({
    patientName: '',
    time: '',
    reason: 'Check-up',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ patientName: '', time: '', reason: 'Check-up' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAppointment = () => {
    if (!formData.patientName || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    const newAppointment: Appointment = {
      id: String(appointments.length + 1),
      time: formData.time,
      patientName: formData.patientName,
      type: (formData.reason as 'Check-up' | 'Surgery' | 'Follow-up') || 'Check-up',
      status: 'Pending',
    };

    setAppointments((prev) => [...prev, newAppointment]);
    handleCloseModal();
  };

  return (
    <div className="flex h-full gap-6 p-8">
      {/* Left Column - Calendar & Upcoming Requests */}
      <div className="w-[30%] space-y-6">
        {/* Calendar Component */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Calendar</h2>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-600 mb-2">January 2026</div>
            <div className="text-3xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-600">Wednesday</div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium transition">
            Select Date
          </button>
        </div>

        {/* Upcoming Requests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Requests</h2>
          <div className="space-y-3">
            {mockUpcomingRequests.map((request) => (
              <div
                key={request.id}
                className="p-3 bg-gray-50 rounded border border-gray-200 hover:border-blue-300 cursor-pointer transition"
              >
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{request.patientName}</p>
                    <p className="text-sm text-gray-600">{request.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Daily Schedule */}
      <div className="w-[70%] bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Daily Schedule - Today</h2>
          </div>
          <button 
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>

        {/* Time Slots */}
        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {timeSlots.map((slot) => {
            const appointment = appointments.find((apt) => apt.time === slot);

            return (
              <div key={slot} className="flex gap-4">
                {/* Time */}
                <div className="w-24 pt-3">
                  <p className="text-sm font-medium text-gray-600 whitespace-nowrap">{slot}</p>
                </div>

                {/* Slot Content */}
                <div className="flex-1">
                  {appointment ? (
                    <div className={`p-4 rounded-lg border-2 ${getTypeColor(appointment.type)} transition hover:shadow-md cursor-pointer`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-300 transition">
                      <p className="text-xs text-gray-400">Available</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">New Appointment</h3>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close appointment modal"
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  id="patientName"
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleFormChange}
                  placeholder="Enter patient name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  id="appointmentTime"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason (Type) */}
              <div>
                <label htmlFor="appointmentReason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <select
                  id="appointmentReason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Check-up">Check-up</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAppointment}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
