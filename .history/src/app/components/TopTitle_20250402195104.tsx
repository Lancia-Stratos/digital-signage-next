import Link from "next/link";

export default function ToTitle() {
    return (
        <Link href="/">
            <div>
                <h1 className="text-2xl font-bold text-gray-400">出荷予定管理システム</h1>
            </div>
        </Link>
    );
}