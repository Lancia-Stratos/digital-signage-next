'use client';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import { toast } from "sonner"
import { UnitWithId } from "@/validations/unit"
import { updateUnit } from "@/lib/actions/updateUnit"
import { deleteUnit } from "@/lib/actions/deleteUnit"

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: UnitWithId | null;
    onUpdated: () => void;
    onDeleted?: () => void;
}

export default function UnitEditDialog({ open, onOpenChange, unit, onUpdated, onDeleted }: Props) {
    const [name, setName] = useState(unit?.name ?? "");

    useEffect(() => {
        setName(unit?.name ?? "");
    }, [unit]);

    const onSubmit = async () => {
        if (!unit) return;
        const result = await updateUnit(unit.id, { name });
        if (result.success) {
            onOpenChange(false);
            onUpdated();
            toast.success(`単位「${name}」を更新しました`);
        } else if (result.error === 'duplicate') {
            toast.error('すでに登録されています');
        } else {
            toast.error('更新に失敗しました');
        }
    };

    const handleDelete = async () => {
        if (!unit) return;
        const result = await deleteUnit(unit.id);
        if (result.success) {
            onOpenChange(false);
            onDeleted?.();
            toast.success(`単位「${unit.name}」を削除しました`);
        } else {
            toast.error('削除に失敗しました');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>単位編集</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            単位名
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit}>保存</Button>
                    <Button variant="destructive" onClick={handleDelete}>削除</Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>閉じる</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
