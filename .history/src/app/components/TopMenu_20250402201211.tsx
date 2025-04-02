import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function Page() {
    return (
        <div>
            <Button variant="ghost" className="h-auto p-2 text-gray-500 hover:text-gray-900 hover:bg-transparent">
                <Link href="/dashboard">
                    <div className="flex items-center gap-2">
                        <Home className="!w-8 !h-8" />
                        <span>Dashboard</span>
                    </div>
                </Link>
            </Button>
        </div>
    );
}