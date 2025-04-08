import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div>
          <h1 className="text-4xl font-bold text-center">デジタルサイネージシステム</h1>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex justify-center items-center min-h-[calc(100vh-６rem)]">
          <SignIn />
        </div>
      </SignedOut>
    </>
  );
} 