'use client';
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unit, UnitSchema, UnitWithId } from "@/validations/unit"
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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [name, setName] = useState(unit?.name ?? "");

    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
        defaultValues: { name: unit?.name || "" },
    });

    const onSubmit = async (data: Unit) => {
        if (!unit) return;
        const result = await updateUnit(unit.id, data);
        if (result.success) {
            reset();
            onOpenChange(false);
            onUpdated();
            toast.success(`単位「${data.name}」を更新しました`);
        } else if (result.error === 'duplicate') {
            toast.error('すでに登録されています');
        } else {
            toast.error('更新に失敗しました');
        }
    };

    const handleDelete = async () => {
        if (!unit) return;
        setIsDeleting(true);

        try {
            const result = await deleteUnit(unit.id);
            if (result.success) {
                onOpenChange(false);
                onDeleted?.();
                toast.success(`単位「${unit.name}」を削除しました`);
            } else {
                toast.error('削除に失敗しました');
            }
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    return open ? (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => onSubmit({ ...unit, name })}>保存</button>
            <button onClick={() => handleDelete()}>削除</button>
            <button onClick={() => onOpenChange(false)}>閉じる</button>
        </div>
    ) : null;
}
