"use client";
import { UnitEditDialog } from "./unitEditDialog";
import { UnitAddDialog } from "./unitAddDialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { UnitWithId } from "@/validations/unit";

// 型を定義
type Unit = {
    units: UnitWithId[];
};

// 型を使って関数を書く
export default function UnitPageClient({ units }: Unit) {
    const [currentTime, setCurrentTime] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setCurrentTime(new Date().toLocaleString('ja-JP'));
    }, []);

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
                                    <UnitEditDialog key={unit.id} unit={unit} onSuccess={() => router.refresh()}>
                                        <TableRow className="cursor-pointer hover:bg-gray-100">
                                            <TableCell>{unit.id}</TableCell>
                                            <TableCell>{unit.name}</TableCell>
                                            <TableCell>{new Date(unit.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</TableCell>
                                            <TableCell>{new Date(unit.updatedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</TableCell>
                                        </TableRow>
                                    </UnitEditDialog>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <UnitAddDialog />
                    </CardFooter>
                </CardHeader>
            </Card>
            <p className="text-sm text-gray-500 text-right mt-4">
                最終更新: {currentTime}
            </p>
        </>
    );
} 