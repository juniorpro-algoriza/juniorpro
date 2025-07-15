import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <h1>Homepage</h1>
      <div className="flex gap-2">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
        <Link href="/style-guide">Style Guide</Link>
      </div>
    </main>
  );
};

export default HomePage;
