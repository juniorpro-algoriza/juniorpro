import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <h1>Homepage</h1>
      <div className="flex flex-col gap-4">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </div>
    </main>
  );
};

export default HomePage;
