import {
  AmazonIcon,
  AppleIcon,
  GoogleIcon,
  MetaIcon,
  MicrosoftIcon,
} from "@icons";
import IBMIcon from "@public/images/IBM-Icon.svg";
import Image from "next/image";

export const TrustedOrganizationsSection = () => {
  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-maastricht-blue mb-12">
          Trusted by leading organizations
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Google */}
          <div className="flex items-center gap-2 text-gray-500">
            <GoogleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              Google
            </span>
          </div>

          {/* Apple */}
          <div className="flex items-center gap-2 text-gray-500">
            <AppleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              Apple
            </span>
          </div>

          {/* Amazon */}
          <div className="flex items-center gap-2 text-gray-500">
            <AmazonIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              Amazon
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 text-gray-500">
            <MetaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              Meta
            </span>
          </div>

          {/* Microsoft */}
          <div className="flex items-center gap-2 text-gray-500">
            <MicrosoftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              Microsoft
            </span>
          </div>

          {/* IBM */}
          <div className="flex items-center gap-2 text-gray-500">
            <Image
              src={IBMIcon}
              alt="IBM Icon"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              IBM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
