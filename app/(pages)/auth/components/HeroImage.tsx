// TODO: use next/image component instead of making the image a background image
// See why: https://nextjs.org/docs/app/api-reference/components/image
// Import the image from the public folder and use the import instead.
// TODO: get image file from ui/ux team as the image in figma is 500x750
// we need an image that is the same size as design
// TODO: add text on top of image

import Image from "next/image";
import loginBg from "../../../../public/images/hero-img.jpg";

export const HeroImage = () => {
  return (
    <div className="h-screen items-center hidden md:flex">
      <Image
        className="rounded-4xl max-h-[90vh]"
        src={loginBg}
        alt=""
        priority={true}
        placeholder="blur"
      />
    </div>
  );
};
// (
//   <div className="w-1/2 relative overflow-hidden">
//     <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl m-6 opacity-30 bg-[url(/images/login-bg.jpg)]"></div>
//     <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-12">
//       <div className="flex flex-col items-start">
//         {/* TODO: replace text-[#xxxxxx] */}
//         <h1 className="text-[40px] font-medium text-[#2B3453] mb-2 leading-tight">
//           Challenge starts here
//         </h1>
//         {/* TODO: replace text-[#xxxxxx] */}
//         <p className="text-[32px] font-medium text-start text-[#737F8E] max-w-md leading-relaxed">
//           Create an account to Join Our Community
//         </p>
//       </div>
//     </div>
//   </div>
// );
