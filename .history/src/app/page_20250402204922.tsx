import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>
        <SignedIn>
          <h1 className="text-4xl font-bold text-center">デジタルサイネージシステム</h1>
        </SignedIn>
      </div>
    </>
  );
} 