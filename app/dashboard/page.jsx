'use client';
import React from 'react';
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-10 text-center">TaskManager</h2>

        <nav className="flex flex-col gap-4">
          <a
            href="/dashboard"
            className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg transition"
          >
            <FaTasks /> Dashboard
          </a>
          <a
            href="/tasks"
            className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg transition"
          >
            <FaCheckCircle /> My Tasks
          </a>
          <a
            href="/about"
            className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg transition"
          >
            <FaClock /> About
          </a>
        </nav>

        <div className="mt-auto border-t border-blue-500 pt-5">
          <button className="flex items-center gap-3 text-red-300 hover:text-red-400">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-blue-600" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaTasks className="text-blue-600 text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">42</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-green-600 text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">28</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaClock className="text-yellow-500 text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">14</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✅ Completed “Design login page”</li>
            <li>🕒 Added new task “Integrate Supabase Auth”</li>
            <li>📤 Uploaded image for “Dashboard UI”</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
