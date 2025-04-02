'use client';

import { useState, useEffect } from 'react';
import { getTopScores } from '@/lib/firestore';

export default function Leaderboard({ limit = 10 }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const topScores = await getTopScores(limit);
        setScores(topScores);
        setError(null);
      } catch (err) {
        console.error('Error fetching scores:', err);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [limit]);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="leaderboard-container">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {scores.length === 0 ? (
        <p>No scores to display yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Rank</th>
              <th className="border p-2 text-left">Player</th>
              <th className="border p-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{score.username}</td>
                <td className="border p-2">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}