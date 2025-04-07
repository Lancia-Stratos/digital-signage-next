import Link from "next/link";
import { Button } from "@/components/ui/button"
// import { Home, Ruler } from "lucide-react"
import { IoHomeSharp } from "react-icons/io5";
import { FaPencilRuler } from "react-icons/fa";

export default function Page() {
    return (
        <div className="flex gap-2">
            <Button variant="link" className="text-gray-500 hover:text-gray-900 p-0">
                <Link href="/dashboard">
                    <div className="flex items-center gap-2">
                        <IoHomeSharp className="!w-4 !h-4" />
                        {/* <Home className="!w-6 !h-6" /> */}
                        <div className="text-md font-bold">Dashboard</div>
                    </div>
                </Link>
            </Button>

            <Button variant="link" className="text-gray-500 hover:text-gray-900 p-0">
                <Link href="/unit">
                    <div className="flex items-center gap-2">
                        <FaPencilRuler className="!w-4 !h-4" />
                        {/* <Ruler className="!w-6 !h-6" /> */}
                        <div className="text-md font-bold">単位</div>
                    </div>
                </Link>
            </Button>
        </div>
    );
}