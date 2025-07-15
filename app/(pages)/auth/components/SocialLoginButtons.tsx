// TODO: Replace all arbieaty colors classes with their var name i.e: text-[#xxxxxx] ==> text-primary/secondary/etc...

import { Button } from "@components";
import { AppleIcon, GoogleIcon } from "@icons";

export const SocialLoginButtons = () => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="secondary"
        // TODO: classes should be in the button component itself and not here.
        className="w-full text-primary hover:text-[#737F8E] justify-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm"
        icon={<GoogleIcon />}
      >
        Login With Google
      </Button>
      <Button
        variant="secondary"
        // TODO: classes should be in the button component itself and not here.
        className="w-full text-[#737F8E] hover:text-[#737F8E] justify-center items-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm"
        icon={<AppleIcon />}
      >
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
