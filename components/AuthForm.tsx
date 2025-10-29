// 'use client';

// import { supabase } from '../libs/supabase-client';
// import { useState } from 'react';
// // import { supabase } from '../lib/supabase-client';

// export default function AuthForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({ email, password });
//         if (error) throw error;
//         setMessage(
//           'Sign-up successful! Please check your email to verify your account.'
//         );
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         setMessage('Login successful!');
//       }
//     } catch (error: any) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     setMessage('');

//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: window.location.origin, // redirect back to your app after login
//         },
//       });
//       if (error) throw error;
//     } catch (error: any) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full p-5">
//       <h2 className="text-5xl text-center px-3">
//         {isSignUp ? 'Sign Up' : 'Login'}
//       </h2>

//       <form
//         onSubmit={handleAuth}
//         style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
//       >
//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={{ padding: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={{ padding: 10 }}
//         />
//         <button type="submit" disabled={loading} style={{ padding: 10 }}>
//           {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
//         </button>
//       </form>

//       <p style={{ marginTop: 10 }}>
//         {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//         <button
//           onClick={() => setIsSignUp(!isSignUp)}
//           style={{
//             color: 'blue',
//             border: 'none',
//             background: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           {isSignUp ? 'Login' : 'Sign Up'}
//         </button>
//       </p>

//       <hr style={{ margin: '20px 0' }} />

//       <button
//         onClick={handleGoogleLogin}
//         disabled={loading}
//         style={{
//           padding: 10,
//           width: '100%',
//           backgroundColor: '#4285F4',
//           color: 'white',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         {loading ? 'Connecting...' : 'Continue with Google'}
//       </button>

//       {message && <p style={{ marginTop: 15, color: 'gray' }}>{message}</p>}
//     </div>
//   );
// }

// 2ndd
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { supabase } from '../libs/supabase-client';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Sign-up successful! Check your email for verification.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Login successful!');
        router.push('/'); // ✅ Redirect to home page
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
        },
      });

      if (error) throw error;
      toast.loading('Redirecting to Google…');
    } catch (err) {
      console.error('Google sign-in error:', err);
      toast.error('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto  p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>

      <form onSubmit={handleAuth} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Please wait…' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline font-medium"
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#4285F4] hover:bg-[#357ae8]'
        }`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.19 3.6l6.85-6.85C35.36 2.73 30.05 0 24 0 14.72 0 6.75 5.56 2.95 13.59l7.98 6.22C12.43 13.63 17.74 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.98 24.55c0-1.57-.14-3.09-.39-4.55H24v9.01h12.94c-.56 2.92-2.22 5.39-4.74 7.07l7.35 5.71c4.29-3.96 6.73-9.78 6.73-17.24z"
          />
          <path
            fill="#4A90E2"
            d="M9.22 28.18A14.5 14.5 0 0 1 8.5 24c0-1.46.25-2.87.72-4.18l-7.98-6.22A23.897 23.897 0 0 0 0 24c0 3.89.93 7.57 2.57 10.82l8.21-6.64z"
          />
          <path
            fill="#FBBC05"
            d="M24 48c6.05 0 11.36-1.98 15.14-5.36l-7.35-5.71c-2.04 1.37-4.64 2.17-7.79 2.17-6.26 0-11.57-4.13-13.07-9.71l-8.21 6.64C6.75 42.44 14.72 48 24 48z"
          />
        </svg>
        {loading ? 'Connecting…' : 'Continue with Google'}
      </button>
    </div>
  );
}
