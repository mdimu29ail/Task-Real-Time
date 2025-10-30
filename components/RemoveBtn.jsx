'use client';

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const confirmDelete = () => {
    toast(
      t => (
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete this topic?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id); // close confirmation popup
                handleDelete(); // call delete
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="border border-gray-300 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: 'top-center' }
    );
  };

  // Actual delete function
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.dismiss(); // close confirmation toast
        toast.success('Topic deleted successfully!');
        router.refresh();
      } else {
        toast.error('Failed to delete topic.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };

  // Show custom confirmation toast

  return (
    <button
      onClick={confirmDelete} // call the custom toast, not removeTopic
      className="text-red-500 hover:text-red-700 transition"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}
