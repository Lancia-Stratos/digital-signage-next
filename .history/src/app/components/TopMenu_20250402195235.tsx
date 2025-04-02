import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div>
            <Link href="/dashboard">Dashboard</Link>
            <Button variant="link">Link</Button>
        </div>
    );
}