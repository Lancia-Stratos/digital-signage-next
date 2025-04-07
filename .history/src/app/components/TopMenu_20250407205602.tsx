import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Home, Ruler } from "lucide-react"
import { IoHomeSharp } from "react-icons/io5";

export default function Page() {
    return (
        <div>
            <Button variant="link" className="text-gray-500 hover:text-gray-900">
                <Link href="/dashboard">
                    <div className="flex items-center gap-2">
                        <IoHomeSharp />
                        <Home className="!w-6 !h-6" />
                        <div className="text-lg font-bold">Dashboard</div>
                    </div>
                </Link>
            </Button>

            <Button variant="link" className="text-gray-500 hover:text-gray-900">
                <Link href="/unit">
                    <div className="flex items-center gap-2">
                        <Ruler className="!w-6 !h-6" />
                        <div className="text-lg font-bold">単位</div>
                    </div>
                </Link>
            </Button>
        </div>
    );
}