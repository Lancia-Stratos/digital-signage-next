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

export default function UnitPage() {
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
                                <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
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