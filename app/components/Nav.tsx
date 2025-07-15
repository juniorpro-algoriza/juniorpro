"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const Nav = () => {
    const path = usePathname();
    if (path === "/auth/login" || path === "/auth/register") {
        return null;
    }

    return (
        <nav className="border border-black px-4 py-2">
            <ul className="flex gap-4">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-blue-500 hover:underline hover:scale-125 transition-transform duration-500">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const links = [
    { href: "/", label: "Home" },
    { href: "/auth/login", label: "Login" },
    { href: "/auth/register", label: "Register" },
    { href: "/style-guide", label: "Style Guide" },
]