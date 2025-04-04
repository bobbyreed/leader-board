import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Class Leaderboard</h1>
        <Leaderboard limit={30} />
      </div>
    </main>
  );
}