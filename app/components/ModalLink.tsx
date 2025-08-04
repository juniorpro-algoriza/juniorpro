
import Link from "next/link"
import type { ReactNode } from "react"
import type { ModalName } from './types/ModalName'

interface ModalLinkProps {
  children: ReactNode
  name: ModalName
  className?: string
}

export const ModalLink = ({ children, name, className }: ModalLinkProps) => {
  return (
    <Link className={className} href={`/modal/${name}`}>
      {children}
    </Link>
  )
}
