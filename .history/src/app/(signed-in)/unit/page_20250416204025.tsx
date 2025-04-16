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

import { getUnits } from "@/lib/unit"

export default async function UnitPage() {
    try {
        // トランザクションを使用してクエリを実行
        const units = await getUnits();

        return (
            <>
                <Card className="">
                    <CardHeader>
                        <CardTitle>単位管理</CardTitle>
                        {/* デバッグ情報 - 開発完了後に削除 */}
                        {process.env.NODE_ENV === "development" && (
                            <div className="bg-slate-100 p-2 my-2 rounded text-xs overflow-auto max-h-40">
                                <p className="font-bold">データ取得状態:</p>
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
                                    {units.map((unit) => (
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
    } catch (error) {
        console.error('Error fetching units:', error)
        throw new Error('単位データの取得中にエラーが発生しました。')
    }
}