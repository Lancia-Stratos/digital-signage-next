import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UnitAddButton } from "./components/unitAddButton"

import { getUnits, testDatabaseConnection } from "@/lib/unit"

// ユニットの型定義
type Unit = {
    id: string;
    name: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};

// エラーの型定義
type ErrorWithMessage = {
    message: string;
    stack?: string;
};

export default async function UnitPage() {
    try {
        // データベース接続テスト
        const connectionTest = await testDatabaseConnection();
        if (!connectionTest.connected) {
            throw new Error(`データベース接続に失敗しました: ${JSON.stringify(connectionTest.error)}`);
        }

        // ユニットデータの取得
        const units = await getUnits() as Unit[];

        return (
            <>
                <Card className="">
                    <CardHeader>
                        <CardTitle>単位管理</CardTitle>
                        {/* デバッグ情報 - 開発完了後に削除 */}
                        {process.env.NODE_ENV === "development" && (
                            <div className="bg-slate-100 p-2 my-2 rounded text-xs overflow-auto max-h-40">
                                <p className="font-bold">データ取得状態:</p>
                                <p>DB接続: {connectionTest.connected ? "成功" : "失敗"}</p>
                                <p>取得件数: {units.length}件</p>
                                <details>
                                    <summary>詳細データ</summary>
                                    <pre>{JSON.stringify(units, null, 2)}</pre>
                                </details>
                            </div>
                        )}
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>単位名</TableHead>
                                        <TableHead>作成日</TableHead>
                                        <TableHead>更新日</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {units.map((unit: Unit) => (
                                        <TableRow key={unit.id}>
                                            <TableCell>{unit.id}</TableCell>
                                            <TableCell>{unit.name}</TableCell>
                                            <TableCell>
                                                {new Date(unit.createdAt).toLocaleDateString('ja-JP', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                }).replace(/\//g, '/')}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(unit.updatedAt).toLocaleDateString('ja-JP', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                }).replace(/\//g, '/')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>

                        <CardFooter className="flex justify-end">
                            <UnitAddButton />
                        </CardFooter>
                    </CardHeader>
                </Card>
            </>
        )
    } catch (error: unknown) {
        console.error('Error fetching units:', error)
        // エラーのスタックトレースなど詳細情報を表示（開発環境のみ）
        if (process.env.NODE_ENV === "development") {
            const errorWithMessage = error as ErrorWithMessage;
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <h2 className="text-lg font-semibold text-red-700 mb-2">エラーが発生しました</h2>
                    <p className="mb-2">{errorWithMessage.message || '不明なエラー'}</p>
                    <details>
                        <summary className="cursor-pointer text-sm text-red-500">詳細エラー情報</summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-96">
                            {errorWithMessage.stack || JSON.stringify(error, null, 2)}
                        </pre>
                    </details>
                </div>
            );
        }
        throw new Error('単位データの取得中にエラーが発生しました。');
    }
}