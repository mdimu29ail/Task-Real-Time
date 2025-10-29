'use client';
import React from 'react';
import { FaDatabase, FaCloudUploadAlt, FaTasks, FaBolt } from 'react-icons/fa';

export default function About() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        About This Project
      </h1>
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        This <strong>Task Manager</strong> app is built using{' '}
        <strong>Next.js</strong> and
        <strong> Supabase</strong>. It allows users to create, update, and
        delete tasks easily — with image uploads stored in Supabase Storage. All
        data is synced in real-time, ensuring a seamless experience across
        sessions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition">
          <FaTasks className="text-blue-500 text-4xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Task Management</h2>
          <p className="text-gray-600 text-sm">
            Add, edit, and delete tasks with an intuitive interface that keeps
            you organized.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition">
          <FaCloudUploadAlt className="text-blue-500 text-4xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Image Upload</h2>
          <p className="text-gray-600 text-sm">
            Attach images to your tasks using Supabase Storage buckets for quick
            previews and downloads.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition">
          <FaDatabase className="text-blue-500 text-4xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Supabase Integration</h2>
          <p className="text-gray-600 text-sm">
            Data is stored securely and managed via Supabase PostgreSQL backend
            with real-time sync.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition">
          <FaBolt className="text-blue-500 text-4xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Real-Time Updates</h2>
          <p className="text-gray-600 text-sm">
            Any changes to your tasks appear instantly across devices using
            Supabase channels.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-gray-500 text-sm">
          💡 Built with ❤️ using{' '}
          <span className="text-blue-500 font-semibold">Next.js</span>,
          <span className="text-green-500 font-semibold"> TailwindCSS</span>,
          and
          <span className="text-indigo-500 font-semibold"> Supabase</span>.
        </p>
      </div>
    </section>
  );
}
