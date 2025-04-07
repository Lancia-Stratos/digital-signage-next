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

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function UnitPage() {
    const units = await prisma.unit.findMany()
    console.log(units)
    return (
        <>

            <Card className="">
                <CardHeader>
                    <CardTitle>単位管理</CardTitle>
                    <CardContent>

                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
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
                    <CardFooter>
                        フッター
                    </CardFooter>
                </CardHeader>
            </Card>





        </>
    );
}