'use client';

import React, { useState } from 'react';
import { BarChart3, Users, Calendar, MessageCircle, Settings, Menu, X, Heart, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setOpenSidebar] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'Patients', href: '/dashboard/patients', icon: Users },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageCircle },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">HealthOS</span>
          </div>
          <button
            type="button"
            onClick={() => setOpenSidebar(false)}
            aria-label="Close sidebar"
            className="md:hidden p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpenSidebar(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  active
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-2">Need help?</p>
            <button type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpenSidebar(true)}
            aria-label="Open sidebar"
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" aria-label="Notifications" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
    </div>
  );
}