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

// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

export function UnitAddForm() {
    return (
        <>
            <Card className="">
                <CardHeader>
                    <CardTitle>単位管理</CardTitle>
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
                                <TableRow>
                                    <TableCell>test</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </CardContent>

                    <CardFooter className="flex justify-end">
                        ボタン
                    </CardFooter>
                </CardHeader>
            </Card>
        </>
    );
}