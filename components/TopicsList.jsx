'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
import { FaList, FaThLarge } from 'react-icons/fa';
// ➡️ 1. Import your Supabase client (ensure this path is correct)
import { supabase } from '../libs/supabase-client';
import Image from 'next/image';

// Fallback component for the user avatar
const UserFallbackIcon = ({ size = 'w-6 h-6' }) => (
  <svg
    className={`${size} text-gray-400 mr-2 flex-shrink-0`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.98 5.0 0 0010 16a5.978 5.978 0 004.546-2.084A5 5 0 0010 11z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [view, setView] = useState('list'); // list or grid
  // ➡️ 2. State for logged-in user email
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Core Logic: Fetch Topics based on User Email ---
  const fetchTopics = async userEmail => {
    setIsLoading(true);
    let url = 'https://crud-mongo-db-iota.vercel.app/api/topics';

    // Append user email as query parameter for backend filtering
    if (userEmail) {
      url += `?owner=${userEmail}`;
      console.log('Fetching URL:', url);
    }

    try {
      const res = await fetch(url, {
        cache: 'no-store',
      });
      const data = await res.json();
      setTopics(data.topics || []);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ➡️ 3. useEffect to get Supabase session and initiate fetch
  useEffect(() => {
    const getSessionAndFetch = async () => {
      // Retrieve session data from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userEmail = session?.user?.email || null;

      setLoggedInUserEmail(userEmail);
      fetchTopics(userEmail); // Fetch topics, passing the email (or null)
    };

    getSessionAndFetch();
  }, []);

  if (isLoading) {
    return (
      <div className="p-5 text-center text-lg text-blue-600">
        Loading topics...
      </div>
    );
  }

  // --- JSX RENDER STARTS HERE ---

  return (
    <div className="p-5">
      {/* Display logged-in user email */}
      {loggedInUserEmail && (
        <div className="mb-4 text-right text-sm text-gray-700">
          Viewing topics for:{' '}
          <strong className="text-blue-600">{loggedInUserEmail}</strong>
        </div>
      )}

      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setView(view === 'list' ? 'grid' : 'list')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
        >
          {view === 'list' ? <FaThLarge /> : <FaList />}
          {view === 'list' ? 'Grid View' : 'List View'}
        </button>
      </div>

      {/* --- LIST VIEW (TABLE) --- */}
      {view === 'list' && (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12 hidden sm:table-cell"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12 hidden sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12 hidden sm:table-cell"
                >
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3 w-1/12"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topics.map(t => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  {/* 1. Name */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 000 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="font-medium text-sm text-gray-800 truncate">
                        {t.title}
                      </div>
                    </div>
                  </td>

                  {/* 2. Owner (Photo, Name, Email) - CORRECTED & CLEANED */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600 hidden sm:table-cell">
                    <div className="relative w-10 h-10">
                      <Image
                        src={t.creatorPhoto}
                        alt={t.creator}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  </td>

                  {/* 3. Description */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs hidden sm:table-cell">
                    {t.description}
                  </td>

                  {/* 4. Create Date */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>

                  {/* 5. Actions */}
                  <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end items-center">
                      <RemoveBtn id={t._id} />
                      <Link href={`/editTopic/${t._id}`}>
                        <HiPencilAlt
                          size={20}
                          className="text-gray-500 hover:text-blue-600 transition"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- GRID VIEW (CARDS) --- */}
      {view === 'grid' && (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {topics.map(t => (
            <div
              key={t._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-white flex flex-col"
            >
              {/* Top Bar: Title and Actions */}
              <div className="flex items-center p-3 border-b border-gray-100">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
                <h2 className="font-medium text-sm text-gray-800 flex-grow truncate">
                  {t.title || 'Untitled Topic'}
                </h2>
                <div className="flex gap-2 items-center flex-shrink-0 ml-2">
                  <RemoveBtn id={t._id} />
                  <Link href={`/editTopic/${t._id}`}>
                    <HiPencilAlt
                      size={18}
                      className="text-gray-500 hover:text-blue-600 transition"
                    />
                  </Link>
                </div>
              </div>

              {/* Main Image Preview */}
              <div className="flex-grow h-40 bg-gray-100 flex justify-center items-center overflow-hidden">
                <Image
                  src={t.image || '/no-image.png'}
                  alt={t.title || 'No image'}
                  width={300} // required
                  height={200} // required
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Bottom Bar: Creator Photo, Name, Email, and Date */}
              <div className="p-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center min-w-0">
                  {/* Creator Profile Photo */}
                  {t.creatorPhoto ? (
                    <Image
                      src={t.creatorPhoto}
                      alt={t.creator || 'Creator'}
                      width={24} // 24px width
                      height={24} // 24px height
                      className="rounded-full mr-2 object-cover flex-shrink-0"
                    />
                  ) : (
                    <UserFallbackIcon size="w-6 h-6" />
                  )}

                  {/* Creator Name and Email */}
                  <div className="min-w-0">
                    <span className="font-medium text-gray-800 block truncate">
                      {t.creator || 'Unknown Creator'}
                    </span>
                    <span className="text-gray-500 block truncate">
                      {t.creatorEmail || 'No Email'}
                    </span>
                  </div>
                </div>

                {/* Date Created */}
                <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
