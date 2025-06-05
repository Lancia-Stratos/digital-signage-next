'use client';
import { useEffect, useState } from "react";
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

export function UnitEditDialog({ open, onOpenChange, unit, onUpdated, onDeleted }: Props) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
        defaultValues: { name: unit?.name || "" },
    });

    useEffect(() => {
        if (unit) {
            reset({ name: unit.name });
        } else {
            reset({ name: "" });
        }
        setShowDeleteConfirm(false);
    }, [unit, reset]);

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

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                onOpenChange(isOpen);
                if (!isOpen) {
                    reset();
                    setShowDeleteConfirm(false);
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>単位編集</DialogTitle>
                    <DialogDescription>
                        {showDeleteConfirm ? `単位「${unit?.name}」を削除しますか？この操作は取り消せません。` : ""}
                    </DialogDescription>
                </DialogHeader>
                {!showDeleteConfirm ? (
                    <>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    単位名
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    {...register('name')}
                                />
                            </div>
                            {formState.errors.name && (
                                <p className="text-sm text-red-600">
                                    {formState.errors.name?.message}
                                </p>
                            )}
                        </div>

                        <DialogFooter className="items-center justify-between">

                            <div className="flex flex-col gap-10">
                                <Button onClick={handleSubmit(onSubmit)}>保存</Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    削除
                                </Button>
                            </div>

                        </DialogFooter>
                    </>
                ) : (
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                        >
                            キャンセル
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "削除中..." : "削除する"}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
