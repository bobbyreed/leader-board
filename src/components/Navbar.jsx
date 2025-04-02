'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Next.js Leaderboard
        </Link>
        
        <div className="space-x-4">
          <Link href="/" className="hover:text-indigo-200">
            Home
          </Link>
          
          {user ? (
            <>
              <Link href="/add-score" className="hover:text-indigo-200">
                Add Score
              </Link>
              <button
                onClick={logout}
                className="hover:text-indigo-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-indigo-200">
                Login
              </Link>
              <Link href="/signup" className="hover:text-indigo-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}