import { SignIn } from '@clerk/nextjs'

import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-30rem)]">
            <LogIn />
            <SignIn />
        </div>
    )
}