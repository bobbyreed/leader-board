// src/lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';
import { 
  getFirestore,
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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

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

export { app, db, auth };