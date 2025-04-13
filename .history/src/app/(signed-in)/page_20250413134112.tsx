import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div>
          <div className="text-4xl font-bold">Home</div>
        </div>
      </SignedIn>

      <SignedOut>
        <div>
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </>
  );
} 