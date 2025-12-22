import Link from "next/link";

export const LoginLink = () => (
  <p className="text-sm text-gray-600 text-center">
    Already have an account?
    <Link href="/auth/login" className="text-violet-normal font-medium">
      Login
    </Link>
  </p>
);
