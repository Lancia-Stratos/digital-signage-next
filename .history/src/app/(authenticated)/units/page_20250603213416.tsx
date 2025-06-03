import {
    Table,
    TableBody,
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
} from "@/components/ui/card"

import { UnitAddDialog } from "./components/unitAddDialog"
import { UnitEditDialog } from "./components/unitEditDialog"
import { prisma } from "@/lib/prisma"
import { type Unit } from '@/schemas/zod'
import { useState } from "react"

export default async function UnitPage() {
    const units: Unit[] = await prisma.unit.findMany()
    console.log(units)

    // クライアントコンポーネントで状態管理
    const [editUnit, setEditUnit] = useState<Unit | null>(null);
    const [editOpen, setEditOpen] = useState(false);

    return (
        <>
            <meta httpEquiv="refresh" content="3600" />

            <Card className="">
                <CardHeader>
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
                                    <TableRow
                                        key={unit.id}
                                        onClick={() => { setEditUnit(unit); setEditOpen(true); }}
                                        style={{ cursor: 'pointer' }}
                                        className="hover:bg-gray-100"
                                    >
                                        <TableCell>
                                            {unit.id}
                                        </TableCell>
                                        <TableCell>{unit.name}</TableCell>
                                        <TableCell>{new Date(unit.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
                                        </TableCell>
                                        <TableCell>{new Date(unit.updatedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>

                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <UnitAddDialog />
                    </CardFooter>
                </CardHeader>
            </Card>

            <UnitEditDialog unit={editUnit} open={editOpen} onOpenChange={(open) => {
                setEditOpen(open);
                if (!open) setEditUnit(null);
            }} />

            <p className="text-sm text-gray-500 text-right mt-4">
                最終更新: {new Date().toLocaleString('ja-JP')}
            </p>
        </>
    );
}