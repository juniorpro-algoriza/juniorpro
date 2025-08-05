import Link from "next/link";
import { ModalLink } from "../ModalLink";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/auth/sign-up", label: "Register" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/style-guide", label: "Style Guide" },
];

export const Nav = () => {
  return (
    <div className="xl:px-[91px] p-4 pt-8 text-base lg:text-lg xl:text-xl">
      <nav className="justify-between bg-white flex items-center pr-4 pl-10 py-5 shadow-lg 60 rounded-4xl">
        <div className="hidden xl:block">
          <Link href="/home">
            <Logo />
          </Link>
        </div>
        <ul className="flex xl:gap-4 gap-2 flex-wrap">
          {links.map((link) => (
            <li key={link.href} className="w-1/3 md:w-fit">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <ModalLink name="TestModal">Test Modal</ModalLink>
          </li>
        </ul>
        <div>
          <Link
            href="/auth/login"
            className="rounded-4xl text-white bg-violet-normal xl:py-3 xl:px-8 px-2 py-1"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};
