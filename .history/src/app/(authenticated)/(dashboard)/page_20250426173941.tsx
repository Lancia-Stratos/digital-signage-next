import { SignedOut } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      {/* <SignedIn> */}
      {/* SignedInで囲まなくてもlayout.tsxで<ClerkProvider>囲んでいるので、ここで囲む必要はない */}
      <div>
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