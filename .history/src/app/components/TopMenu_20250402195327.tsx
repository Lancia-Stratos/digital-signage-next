import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div>

            <Button variant="link">
                <Link href="/dashboard" className="text-gray-600">Dashboard</Link>
            </Button>
        </div>
    );
}