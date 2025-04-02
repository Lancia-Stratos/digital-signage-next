import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function Page() {
    return (
        <div>

            <Button variant="link">
                <Link href="/dashboard" className="text-xl text-gray-500 hover:text-gray-900">
                    <Home className="w-4 h-4" />
                    Dashboard
                </Link>
            </Button>


        </div>
    );
}