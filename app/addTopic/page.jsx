'use client';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

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
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (res.ok) {
        toast.success('Topic added successfully!');
        router.push('/');
        router.refresh();
      } else {
        toast.error('Failed to create topic.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={e => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={e => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
