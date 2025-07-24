import { Button } from "@components";
import { AppleIcon, GoogleIcon } from "@icons";

export const SocialLoginButtons = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Button
        intent="tertiary"
        className="text-storm-500 rounded-xl px-14 border-border-secondary shadow"
        iconPosition='left'
        icon={<GoogleIcon />}
      >
        Login With Google
      </Button>
      <Button
        className="text-storm-500 px-14 rounded-xl border-border-secondary shadow"
        intent="tertiary"
        iconPosition='left'
        icon={<AppleIcon />}
      >
        Login With Apple
      </Button>
    </div>

    <div className="flex items-center">
      <div className="w-full border-t border-gray-300"></div>
      <span className="text-sm px-2 text-gray-500">OR</span>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  </>
);
