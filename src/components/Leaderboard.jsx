'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { getTopScores } from '@/lib/firestore';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function Leaderboard({ limitCount = 10 }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const q = query(
        collection(db, 'leaderboard'),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
  
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const scoresData = [];
          querySnapshot.forEach((doc) => {
            scoresData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setScores(scoresData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error listening to leaderboard:', err);
          setError('Failed to load leaderboard data. Please try again later.');
          setLoading(false);
        }
      );
  
      // Clean up listener on component unmount
      return () => unsubscribe();
    }, [limitCount]);
  
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