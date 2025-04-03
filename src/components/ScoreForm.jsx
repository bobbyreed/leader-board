'use client';

import { useState } from 'react';
import { addScore } from '../lib/firestore';

export default function ScoreForm({ userId, username, onScoreAdded }) {
  const [score, setScore] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!score || isNaN(Number(score))) {
      setError('Please enter a valid score');
      return;
    }
    
    try {
      setSubmitting(true);
      await addScore(userId || 'anonymous', username || 'Anonymous', Number(score));
      setScore('');
      setError(null);
      if (onScoreAdded) onScoreAdded();
    } catch (err) {
      console.error('Error adding score:', err);
      setError('Failed to add score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="score-form-container my-4">
      <h3 className="text-xl font-semibold mb-2">Add Your Score</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label htmlFor="score" className="block text-sm font-medium">
            Score
          </label>
          <input
            type="number"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your score"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Adding...' : 'Add Score'}
        </button>
      </form>
    </div>
  );
}