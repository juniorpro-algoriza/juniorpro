import { Suspense } from "react";
import { VerifyResetPassword } from "../../_components";

const VerifyResetPasswordPage = () => {
  return (
    <Suspense fallback={null}>
      <main>
        <VerifyResetPassword />
      </main>
    </Suspense>
  );
};

export default VerifyResetPasswordPage;
