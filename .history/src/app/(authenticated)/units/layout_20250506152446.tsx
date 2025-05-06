'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 3600000); // 1時間 = 3600000ミリ秒

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">単位管理</h1>
                <p className="text-sm text-gray-500 ml-auto mr-1">
                    最終更新: {new Date().toLocaleString('ja-JP')}
                </p>
            </div>
            {children}
        </div>
    );
}