import { AuthContextProvider } from '@/context/AuthContext';
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
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}