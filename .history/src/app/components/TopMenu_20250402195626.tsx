import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function Page() {
    return (
        <div>

            <Button variant="link">
                <Link href="/dashboard" className="text-xl text-gray-500 hover:text-gray-900">
                    <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </div>
                </Link>
            </Button>


        </div>
    );
}