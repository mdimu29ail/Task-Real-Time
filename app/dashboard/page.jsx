'use client';
import React, { useState } from 'react';
import {
  FaChartPie,
  FaFolderOpen,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <FaChartPie className="text-blue-600 text-3xl mb-2" />
                <h2 className="text-lg font-semibold">Total Projects</h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <FaUsers className="text-green-600 text-3xl mb-2" />
                <h2 className="text-lg font-semibold">Active Team Members</h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">8</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <FaFileAlt className="text-yellow-500 text-3xl mb-2" />
                <h2 className="text-lg font-semibold">Reports Generated</h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">23</p>
              </div>
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <ul className="space-y-3">
              <li className="bg-white p-4 rounded-lg shadow">
                🚀 Website Redesign —{' '}
                <span className="text-green-600">Ongoing</span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                🧩 Mobile App Development —{' '}
                <span className="text-yellow-600">Pending</span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                💼 Marketing Dashboard —{' '}
                <span className="text-blue-600">Completed</span>
              </li>
            </ul>
          </div>
        );

      case 'Team':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['John Doe', 'Sarah Lee', 'Michael Smith', 'Emma Brown'].map(
                (name, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                  >
                    <FaUserCircle className="text-blue-600 text-5xl mx-auto mb-3" />
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">Developer</p>
                  </div>
                )
              )}
            </div>
          </div>
        );

      case 'Reports':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <p className="text-gray-600">
              Download or view project performance reports.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Download Report
              </button>
              <button className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300">
                View Report
              </button>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <form className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-lg">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="john@example.com"
                />
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </form>
          </div>
        );

      case 'Support':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard work in progress
            </h1>
            <p className="text-gray-600 mb-4">
              Need help? Contact our support team below.
            </p>
            <div className="bg-white p-6 rounded-xl shadow max-w-md">
              <p className="font-semibold text-gray-700 mb-2">Email:</p>
              <p className="text-blue-600">support@taskmanager.com</p>
              <p className="font-semibold text-gray-700 mt-4 mb-2">Phone:</p>
              <p className="text-blue-600">+1 (555) 123-4567</p>
            </div>
          </div>
        );

      default:
        return <div>Invalid selection</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-10 text-center">TaskManager</h2>

        <nav className="flex flex-col gap-3">
          {[
            { name: 'Overview', icon: <FaChartPie /> },
            { name: 'Projects', icon: <FaFolderOpen /> },
            { name: 'Team', icon: <FaUsers /> },
            { name: 'Reports', icon: <FaFileAlt /> },
            { name: 'Settings', icon: <FaCog /> },
            { name: 'Support', icon: <FaLifeRing /> },
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                activeTab === item.name
                  ? 'bg-blue-600'
                  : 'hover:bg-blue-600 bg-blue-700'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-blue-500 pt-5">
          <button className="flex items-center gap-3 text-red-300 hover:text-red-400">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-blue-600" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Dynamic Section */}
        {renderContent()}
      </main>
    </div>
  );
}
