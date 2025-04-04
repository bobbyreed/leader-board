import { AuthContextProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Classroom Leaderboard',
  description: 'A leaderboard application built with Next.js and Firebase',
};

export default function RootLayout({ children }) {
    return (
      //main site HTML page (edit here for static HTML changes to main page)
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