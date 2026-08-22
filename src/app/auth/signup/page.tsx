'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function SignUpForm() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    // The existing "Full Name" input maps to the backend's username field.
    const username = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    try {
      const res = await register({ username, email, password });
      if (!res.success || !res.data?.token) {
        setError(res.message || 'Failed to create account');
        setIsPending(false);
        return;
      }
      setAuth(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gray-900">

      <div className="w-sm">
       <h1 className="mt-10 text-center text-2xl/9 font-bold text-white">Create your account</h1>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-100">Full Name</label>
        <input id="name" name="name" type="text" required placeholder="John Doe"
          className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email address</label>
        <input id="email" name="email" type="email" required placeholder="john@my-company.com"
          className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
        <input id="password" name="password" type="password" required placeholder="*****"
          className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      {error && (
        <div className="rounded-md px-3 py-2 text-sm text-red-500">
          {error}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="flex w-sm justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">
        {isPending ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}
