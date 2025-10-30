'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../libs/supabase-client';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!mounted) return null;

  const user = session?.user;

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">MyApp</Link>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Center + Right: Links */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex items-center justify-between shadow-md md:shadow-none transition-all duration-300 ${
          menuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-0 text-center md:text-left">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/task" className="hover:text-blue-600">
            Task Real Time
          </Link>
          {session && (
            <>
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/addTopic" className="hover:text-blue-600">
                Add Task
              </Link>
            </>
          )}
        </div>

        {/* Right: Profile / Login */}
        <div className="flex flex-col md:flex-row items-center gap-3 px-4 pb-4 md:pb-0">
          {session ? (
            <>
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
              ) : (
                <Image
                  src="/default-avatar.png"
                  alt="Default Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
              )}

              <span className="font-medium text-gray-800 text-sm md:text-base">
                {user?.user_metadata?.full_name || user?.email || 'User'}
              </span>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full md:w-auto"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full md:w-auto text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
