import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div>

            <Button variant="link">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
            </Button>
        </div>
    );
}