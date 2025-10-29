// 'use client';
// import { supabase } from '../libs/supabase-client';
// import { useEffect, useState } from 'react';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
//   email: string;
//   image_url?: string;
// }

// export default function TaskManager({ session }: any) {
//   const [newTask, setNewTask] = useState({ title: '', description: '' });
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [taskImage, setTaskImage] = useState<File | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   // useEffect(() => {
//   //   fetchTasks();
//   //   const myChannel = supabase
//   //     .channel('tasks-channel')
//   //     .on(
//   //       'postgres_changes',
//   //       { event: '*', schema: 'public', table: 'tasks' },
//   //       () => fetchTasks()
//   //     )
//   //     .subscribe();

//   //   return () => supabase.removeChannel(myChannel);
//   // }, []);

//   // const fetchTasks = async () => {
//   //   const { data, error } = await supabase
//   //     .from('tasks')
//   //     .select('*')
//   //     .order('created_at', { ascending: true });
//   //   if (error) console.error('Error fetching tasks:', error);
//   //   else setTasks(data || []);
//   // };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     let imageUrl: string | null = null;

//     if (taskImage) imageUrl = await uploadImageToBucket(taskImage);
//     if (!newTask.title || !newTask.description) return;

//     const { error } = await supabase.from('tasks').insert({
//       title: newTask.title,
//       description: newTask.description,
//       email: session.user?.email,
//       image_url: imageUrl || '',
//     });

//     if (error) console.error('Error adding task:', error);
//     else {
//       setNewTask({ title: '', description: '' });
//       setTaskImage(null);
//       setFileName(null);
//       fetchTasks();
//     }
//   };

//   const deleteTask = async (id: number) => {
//     const { error } = await supabase.from('tasks').delete().eq('id', id);
//     if (error) console.error('Error deleting task:', error);
//     else fetchTasks();
//   };

//   const updateTask = async (id: number, title: string, description: string) => {
//     const { error } = await supabase
//       .from('tasks')
//       .update({ title, description })
//       .eq('id', id);
//     if (error) console.error('Error updating task:', error);
//     else fetchTasks();
//   };

//   const uploadImageToBucket = async (file: File): Promise<string | null> => {
//     const filePath = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from('tasks-buckers')
//       .upload(filePath, file);

//     if (error) {
//       console.error('Upload error:', error.message);
//       return null;
//     }

//     const { data } = supabase.storage
//       .from('tasks-buckers')
//       .getPublicUrl(filePath);
//     return data.publicUrl;
//   };

//   const handleFileChange = (e: any) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setTaskImage(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4">
//       <h1 className="text-3xl font-bold text-center mb-8">📝 Task Manager</h1>

//       {/* Add Task */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-100"
//       >
//         <input
//           type="text"
//           name="title"
//           placeholder="Task Title"
//           value={newTask.title}
//           onChange={e =>
//             setNewTask(prev => ({ ...prev, title: e.target.value }))
//           }
//           className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//         />

//         <textarea
//           name="description"
//           placeholder="Task Description"
//           value={newTask.description}
//           onChange={e =>
//             setNewTask(prev => ({ ...prev, description: e.target.value }))
//           }
//           className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//         />

//         <input
//           type="file"
//           onChange={handleFileChange}
//           accept="image/*"
//           className="w-full mb-2 text-sm text-gray-600"
//         />

//         {fileName && (
//           <p className="text-gray-500 text-sm mb-3">
//             📁 Selected: <span className="font-medium">{fileName}</span>
//           </p>
//         )}

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
//         >
//           ➕ Add Task
//         </button>
//       </form>

//       {/* Task List */}
//       {tasks.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <div className="space-y-4">
//           {tasks.map(task => (
//             <div
//               key={task.id}
//               className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
//                 <p className="text-gray-600 mb-3">{task.description}</p>

//                 {task.image_url && (
//                   <div className="flex flex-col items-center space-y-2">
//                     <img
//                       src={task.image_url}
//                       alt={task.title}
//                       className="w-32 h-32 object-cover rounded-lg border mb-1"
//                     />
//                     <a
//                       href={task.image_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 text-sm underline hover:text-blue-800"
//                     >
//                       🔗 Download File
//                     </a>
//                     <p className="text-gray-500 text-xs">
//                       {task.image_url.split('/').pop()}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => {
//                     const newTitle = prompt('Update title', task.title);
//                     const newDesc = prompt(
//                       'Update description',
//                       task.description
//                     );
//                     if (newTitle && newDesc)
//                       updateTask(task.id, newTitle, newDesc);
//                   }}
//                   className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => deleteTask(task.id)}
//                   className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition"
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// 2nd
'use client';
import { supabase } from '../libs/supabase-client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  email: string;
  image_url?: string;
}

export default function TaskManager({ session }: any) {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskImage, setTaskImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching tasks:', error);
    else setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();

    const myChannel = supabase
      .channel('tasks-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => fetchTasks()
      )
      .subscribe();

    // ✅ Correct cleanup (non-async)
    return () => {
      supabase.removeChannel(myChannel); // don’t await
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let imageUrl: string | null = null;

    if (taskImage) imageUrl = await uploadImageToBucket(taskImage);
    if (!newTask.title || !newTask.description) return;

    const { error } = await supabase.from('tasks').insert({
      title: newTask.title,
      description: newTask.description,
      email: session?.user?.email || 'guest@example.com',
      image_url: imageUrl || '',
    });

    if (error) console.error('Error adding task:', error);
    else {
      setNewTask({ title: '', description: '' });
      setTaskImage(null);
      setFileName(null);
      fetchTasks();
    }
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) console.error('Error deleting task:', error);
    else fetchTasks();
  };

  const updateTask = async (id: number, title: string, description: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ title, description })
      .eq('id', id);
    if (error) console.error('Error updating task:', error);
    else fetchTasks();
  };

  const uploadImageToBucket = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('tasks-buckers')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }

    const { data } = supabase.storage
      .from('tasks-buckers')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">📝 Task Manager</h1>

      {/* Add Task */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-100"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={e =>
            setNewTask(prev => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={e =>
            setNewTask(prev => ({ ...prev, description: e.target.value }))
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full mb-2 text-sm text-gray-600"
        />

        {fileName && (
          <p className="text-gray-500 text-sm mb-3">
            📁 Selected: <span className="font-medium">{fileName}</span>
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          ➕ Add Task
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-600 mb-3">{task.description}</p>

                {task.image_url && (
                  <div className="flex flex-col items-center space-y-2">
                    <Image
                      src={task.image_url}
                      alt={task.title}
                      width={128}
                      height={128}
                      className="rounded-lg border mb-1 object-cover"
                    />
                    <a
                      href={task.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline hover:text-blue-800"
                    >
                      🔗 Download File
                    </a>
                    <p className="text-gray-500 text-xs">
                      {task.image_url.split('/').pop()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    const newTitle = prompt('Update title', task.title);
                    const newDesc = prompt(
                      'Update description',
                      task.description
                    );
                    if (newTitle && newDesc)
                      updateTask(task.id, newTitle, newDesc);
                  }}
                  className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
