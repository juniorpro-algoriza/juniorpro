import { Suspense } from "react";
import { VerifyResetPassword } from "../../components";

const VerifyResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <VerifyResetPassword />
      </main>
    </Suspense>
  );
};

export default VerifyResetPasswordPage;
