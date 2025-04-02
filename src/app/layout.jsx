import { AuthContextProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Next.js Leaderboard',
  description: 'A leaderboard application built with Next.js and Firebase',
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <AuthContextProvider>
            <Navbar />
            <main className="container mx-auto">
              {children}
            </main>
          </AuthContextProvider>
        </body>
      </html>
    );
}