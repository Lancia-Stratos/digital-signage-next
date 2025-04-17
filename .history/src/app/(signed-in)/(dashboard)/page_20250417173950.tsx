import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div>
          <h1 className="text-4xl font-bold">Home</h1>
          <div>ここにダッシュボードを表示する</div>
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