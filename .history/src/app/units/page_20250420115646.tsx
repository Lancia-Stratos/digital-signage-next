'use client';

import { UnitSchema, type Unit } from '@/schemas/zod';

// サンプルデータ
const sampleUnit = {
    id: 1,
    name: "メートル",
    createdAt: new Date(),
    updatedAt: new Date()
};

export default function UnitsPage() {
    const handleValidation = () => {
        try {
            // zodによるバリデーション
            const validatedUnit = UnitSchema.parse(sampleUnit);
            console.log('検証成功:', validatedUnit);
        } catch (error) {
            console.error('検証エラー:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">単位マスター</h1>
            <div className="bg-white shadow rounded p-4">
                <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(sampleUnit, null, 2)}
                </pre>
                <button
                    onClick={handleValidation}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    データ検証
                </button>
            </div>
        </div>
    );
} 