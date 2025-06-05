"use client";
import { UnitEditDialog } from "./components/unitEditDialog";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { UnitAddDialog } from "./components/unitAddDialog";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Card, CardContent, CardFooter, CardHeader,
} from "@/components/ui/card";

export default function UnitPageClient({ units }: { units: UnitWithId[] }) {
    const [selectedUnit, setSelectedUnit] = useState<UnitWithId | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const router = useRouter();
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
                                    <TableRow key={unit.id} className="cursor-pointer hover:bg-gray-100" onClick={() => { setSelectedUnit(unit); setEditDialogOpen(true); }}>
                                        <TableCell>{unit.id}</TableCell>
                                        <TableCell>{unit.name}</TableCell>
                                        <TableCell>{new Date(unit.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</TableCell>
                                        <TableCell>{new Date(unit.updatedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</TableCell>
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
            <p className="text-sm text-gray-500 text-right mt-4">
                最終更新: {new Date().toLocaleString('ja-JP')}
            </p>
            <UnitEditDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                unit={selectedUnit}
                onUpdated={() => { setEditDialogOpen(false); setSelectedUnit(null); router.refresh(); }}
            />
        </>
    );
} 