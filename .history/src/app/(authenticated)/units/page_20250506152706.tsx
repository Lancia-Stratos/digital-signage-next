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
    // CardTitle,
} from "@/components/ui/card"
import { UnitAddButton } from "./components/unitAddButton"
import { prisma } from "@/lib/prisma"
import { type Unit } from '@/schemas/zod'
import { useEffect } from "react"
export default async function UnitPage() {
    const units: Unit[] = await prisma.unit.findMany()
    console.log(units)
    return (
        <>
                useEffect(() => {
        const interval = setInterval(() => {
                window.location.reload();
        }, 3600000); // 1時間 = 3600000ミリ秒

        return () => clearInterval(interval);
    }, []);
            <Card className="">
                <CardHeader>
                    {/* <CardTitle>単位管理</CardTitle> */}
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
                        <UnitAddButton />
                    </CardFooter>
                </CardHeader>
            </Card>
        </>
    );
}