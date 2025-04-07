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
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {units.map((unit) => (
                                    <TableRow key={unit.id}>
                                        <TableCell className="font-medium">{unit.id}</TableCell>
                                        <TableCell>{unit.name}</TableCell>
                                        <TableCell>{new Date(unit.createdAt).toLocaleString('ja-JP')}</TableCell>
                                        <TableCell className="text-right">{new Date(unit.updatedAt).toLocaleString('ja-JP')}</TableCell>
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