'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// Assuming the path to your Supabase client is correct
import { supabase } from '../../libs/supabase-client';

export default function AddTopic() {
  // --- State Initialization ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // State variable is 'image'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // --- Effect Hook for User Session ---
  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the current Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Set the user object if a session exists
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchUser();

    // Optional cleanup function to listen for auth state changes (good practice)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this runs once on mount

  // --- Loading and Auth Guards ---
  if (loading)
    return <p className="text-center py-8">Loading user authentication...</p>;
  if (!user)
    return (
      <p className="text-center py-8 text-red-500">
        Please login to add a topic.
      </p>
    );

  // --- Form Submission Handler ---
  const handleSubmit = async e => {
    e.preventDefault();

    if (!title || !description) {
      toast.error('Title and description are required.');
      return;
    }

    try {
      const res = await fetch(
        'https://crud-mongo-db-iota.vercel.app/api/topics',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            description,
            image: image || '', // Make sure this is not undefined
            creatorEmail: user.email,
            creator: user.user_metadata.full_name || user.email,
            creatorPhoto: user.user_metadata.avatar_url || '',
          }),
        }
      );
      console.log(image);
      if (res.ok) {
        toast.success('Topic added successfully!');
        router.push('/');
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(`Failed to create topic: ${err.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    }
  };

  // --- Rendered Form ---
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Topic</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
        placeholder="Topic Title"
        className="border border-slate-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Topic Description"
        className="border border-slate-300 px-4 py-2 rounded h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        value={image} // ✅ FIX: Use 'image' instead of 'imageURL'
        onChange={e => setImage(e.target.value)}
        type="url"
        placeholder="Image URL (optional)"
        className="border border-slate-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <label>Creator Email:</label>
        <input
          value={user.email}
          readOnly
          className="flex-grow border border-slate-300 px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
      >
        Add Topic
      </button>
    </form>
  );
}
