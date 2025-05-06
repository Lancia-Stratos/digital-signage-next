export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">単位管理</h1>
            {children}
        </div>
    );
}