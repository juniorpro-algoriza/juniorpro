// import Image from "next/image";

export const HeroSection = () => (
  <div className="w-1/2 overflow-hidden">
    <div className="w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl m-6 opacity-30 bg-[url(/images/login-bg.jpg)]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-12">
        <div className="flex flex-col items-start">
          <h1 className="text-[40px] font-medium text-[#2B3453] mb-2 leading-tight">
            Challenge starts here
          </h1>
          <p className="text-[32px] font-medium text-start text-[#737F8E] max-w-md leading-relaxed">
            Create an account to Join Our Community
          </p>
        </div>
      </div>
    </div>
  </div>
);
