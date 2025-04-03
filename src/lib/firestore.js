import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

// Collection reference
const leaderboardRef = collection(db, 'leaderboard');

// Add a new score to the leaderboard
export const addScore = async (userId, username, score) => {
  return await addDoc(leaderboardRef, {
    userId,
    username,
    score,
    timestamp: serverTimestamp(),
  });
};

// Get top scores from the leaderboard
export const getTopScores = async (limitCount = 10) => {
  const q = query(
    leaderboardRef,
    orderBy('score', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  const scores = [];
  
  querySnapshot.forEach((doc) => {
    scores.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  
  return scores;
};

// Update a score
export const updateScore = async (id, newScore) => {
  const scoreRef = doc(db, 'leaderboard', id);
  return await updateDoc(scoreRef, {
    score: newScore,
    timestamp: serverTimestamp(),
  });
};

// Delete a score
export const deleteScore = async (id) => {
  const scoreRef = doc(db, 'leaderboard', id);
  return await deleteDoc(scoreRef);
};