'use client';
import { useState } from "react";
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

    return open ? (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={onSubmit}>保存</button>
            <button onClick={handleDelete}>削除</button>
            <button onClick={() => onOpenChange(false)}>閉じる</button>
        </div>
    ) : null;
}
