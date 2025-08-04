"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ModalPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <h1 className="text-3xl">Redirecting...</h1>
    </div>
  )
}

export default ModalPage
