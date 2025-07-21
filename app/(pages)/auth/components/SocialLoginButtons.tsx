import { Button } from "@components";
import { AppleIcon, GoogleIcon } from "@icons";

export const SocialLoginButtons = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Button intent="tertiary" icon={<GoogleIcon />}>
        Login With Google
      </Button>
      <Button intent="tertiary" icon={<AppleIcon />}>
        Login With Apple
      </Button>
    </div>

    <div className="flex items-center">
      <div className="w-full border-t border-gray-300"></div>
      <span className="text-sm px-2 bg-gray-50 text-gray-500">OR</span>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  </>
);
