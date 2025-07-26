'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [dynastyId, setDynastyId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = mode === 'login' ? '/api/login' : '/api/register';
    const payload =
      mode === 'login' ? { dynastyId, password } : { dynastyId, password, name };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      router.push(`/dynasty/${dynastyId}`);
    }
  };

  return (
    <main className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={dynastyId}
          onChange={(e) => setDynastyId(e.target.value)}
          placeholder="Dynasty ID"
          className="border w-full p-2 rounded"
          required
        />
        {mode === 'register' && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dynasty Name"
            className="border w-full p-2 rounded"
            required
          />
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border w-full p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <p className="mt-4 text-sm">
        {mode === 'login' ? "Don't have a dynasty?" : 'Already registered?'}{' '}
        <button
          className="underline text-blue-600"
          onClick={() => {
            setError('');
            setMode(mode === 'login' ? 'register' : 'login');
          }}
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </main>
  );
}
