export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        useEffect(() => {
            const interval = setInterval(() => {
                window.location.reload();
            }, 3600000); // 1時間 = 3600000ミリ秒

            return () => clearInterval(interval);
        }, []);
    <div>
        <h1 className="text-2xl font-bold mb-2">単位管理</h1>
        {children}
    </div>
    );
}