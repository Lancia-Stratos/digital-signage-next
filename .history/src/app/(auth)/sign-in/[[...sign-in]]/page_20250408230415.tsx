import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-30rem)]">
            <SignIn />
        </div>
    )
}