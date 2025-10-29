'use client'; // required if you use hooks like useState, useEffect

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../libs/supabase-client';
import TaskManager from '../../components/TaskManage';
// import TaskManager from '../../components/TaskManage';
// import { supabase } from '../../lib/supabase-client';

export default function TaskPage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/'); // redirect to home/login if no session
      } else {
        setSession(data.session);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push('/');
        else setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (!session) return <p>Loading...</p>;

  return <TaskManager session={session} />;
}
