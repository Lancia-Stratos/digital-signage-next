export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2 ml-0.5">単位管理</h1>
            {children}
        </div>
    );
}