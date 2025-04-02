import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center">デジタルサイネージシステム</h1>
      </div>
      <Button>
        <LogIn /> Log In
      </Button>
    </>
  );
} 