import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function Page() {
    return (
        <div>
            <Button variant="link" className="text-lg text-gray-500 hover:text-gray-900 p-0">
                <Link href="/dashboard">
                    <div className="flex items-center gap-2 p-2">
                        <Home className="w-16 h-16" />
                        <span>Dashboard</span>
                    </div>
                </Link>
            </Button>
        </div>
    );
}