"use client";

import { useEffect, useState } from "react";
import { Modal } from "@components";
import { useVerifyPayment } from "../../../(pages)/(loged-in)/contributor/tanstack";
import { CircleX, Loader2 } from "lucide-react";
import { Button } from "@components";
import Image from "next/image";
import ROCKET_ICON from "@public/images/rocket-icon.png";
import SUBSCRIPTION_ICON from "@public/images/subscription-icon-3d.png";

import { useRouter } from "next/navigation";

interface PaymentModalProps {
  sessionId?: string;
  plan?: string;
}

type PaymentState = "verifying" | "success" | "error";

export const PaymentModal = ({
  sessionId,
  plan = "Starter Plan",
}: PaymentModalProps) => {
  const router = useRouter();
  const [paymentState, setPaymentState] = useState<PaymentState>("verifying");
  const [verifiedPlan, setVerifiedPlan] = useState<string>(plan);
  const { mutate: verify } = useVerifyPayment();

  useEffect(() => {
    if (sessionId && paymentState === "verifying") {
      verify(sessionId, {
        onSuccess: (data) => {
          setVerifiedPlan(data.plan || plan);
          setPaymentState("success");
        },
        onError: () => {
          setPaymentState("error");
        },
      });
    } else if (!sessionId) {
      setPaymentState("error");
    }
  }, [sessionId, verify, paymentState, plan]);

  const handleAssignSeats = () => {
    router.push("/contributor/juniors");
  };

  const handleTryAgain = () => {
    router.push("/contributor/subscription");
  };

  const renderVerifying = () => (
    <div className="text-center space-y-6 p-10">
      <div className="space-y-4">
        <Image
          src={SUBSCRIPTION_ICON}
          alt="Verifying"
          width={100}
          height={100}
          className="relative z-10 mx-auto"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Verifying Payment...</h2>
          <p className="text-gray-600">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Loader2 className="size-16 animate-spin text-blue-main" />
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center text-center ">
      <div className="relative w-full">
        {/* Soft blue glow behind the rocket */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-main/12 " />
        <Image
          src={ROCKET_ICON}
          alt="Success"
          width={180}
          height={180}
          className="relative z-10 mx-auto -bottom-6 rotate-20"
        />
      </div>
      <div className="p-10 pt-0">
        <div className="space-y-2 mb-8 ">
          <span className="text-blue-main font-extrabold text-sm tracking-widest uppercase block mb-1">
            LEVEL UP COMPLETE!
          </span>
          <h2 className="text-[32px] font-black text-[#0f172a] leading-tight">
            Welcome Aboard
          </h2>
        </div>

        <p className="text-[#64748b] text-base leading-relaxed mb-10 max-w-[340px]">
          You&apos;ve successfully unlocked the{" "}
          <span className="text-blue-main font-bold">{verifiedPlan}</span> . Get
          ready for enhanced missions, deeper insights, and limitless potential!
        </p>

        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleAssignSeats}
          className="w-full max-w-[280px]"
        >
          Assign Seats
        </Button>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center text-center p-10">
      <div className="mb-8 pt-4">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-60" />
          <div className="relative w-24 h-24 bg-red-500 rounded-[32px] flex items-center justify-center shadow-lg shadow-red-200">
            <CircleX
              className="text-white font-black size-10"
              strokeWidth={3}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        <span className="text-red-500 font-extrabold text-sm tracking-widest uppercase block mb-1">
          PAYMENT INCOMPLETE
        </span>
        <h2 className="text-[32px] font-black text-[#0f172a] leading-tight">
          Transaction Failed
        </h2>
      </div>

      <p className="text-[#64748b] text-base leading-relaxed mb-10 max-w-[340px]">
        We couldn&apos;t process your payment at this moment. Don&apos;t worry,
        you haven&apos;t been charged. Please check your details and try again.
      </p>

      <Button
        intent="main2"
        size="mainDefault"
        onClick={handleTryAgain}
        className="w-full max-w-[280px]"
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <Modal panelClassName="rounded-2xl max-w-md p-0 overflow-hidden">
      {paymentState === "verifying" && renderVerifying()}
      {paymentState === "success" && renderSuccess()}
      {paymentState === "error" && renderError()}
    </Modal>
  );
};
