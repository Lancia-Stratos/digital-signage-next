export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            {children}
            a
        </div>
    );
}