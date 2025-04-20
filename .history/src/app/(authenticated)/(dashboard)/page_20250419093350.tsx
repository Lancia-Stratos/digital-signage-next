import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      {/* <SignedIn> */}
      {/* SignedInで囲まなくてもlayout.tsxで囲んでいるので、ここで囲む必要はない */}
      <div>
        <h1 className="text-4xl font-bold">Home</h1>
        <div>ここにダッシュボードを表示する</div>
      </div>
      {/* </SignedIn> */}

      <SignedOut>
        <div>
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </>
  );
} 