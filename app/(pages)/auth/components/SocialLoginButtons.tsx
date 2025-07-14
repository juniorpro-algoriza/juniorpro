import { Button } from "@components";
import { AppleIcon, GoogleIcon } from "@icons";

export const SocialLoginButtons = () => (
  <div className="pb-6">
    <div className="grid grid-cols-2 gap-4 pb-4">
      <Button
        variant="secondary"
        className="w-full text-primary hover:text-[#737F8E] justify-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm"
        icon={<GoogleIcon />}
      >
        Login With Google
      </Button>
      <Button
        variant="secondary"
        className="w-full text-[#737F8E] hover:text-[#737F8E] justify-center items-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm"
        icon={<AppleIcon />}
      >
        Login With Apple
      </Button>
    </div>

    {/* OR Divider */}
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-gray-50 text-gray-500">OR</span>
      </div>
    </div>
  </div>
);
