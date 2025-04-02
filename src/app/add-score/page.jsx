'use client';

import { useState } from 'react';
import ScoreForm from '@/components/ScoreForm';
import { useRouter } from 'next/navigation';

export default function AddScorePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  
  const handleScoreAdded = () => {
    // Redirect to the leaderboard after adding a score
    router.push('/');
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Your Score</h1>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>
        
        <ScoreForm username={username} onScoreAdded={handleScoreAdded} />
        
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}