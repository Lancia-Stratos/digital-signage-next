'use client';
import { useEffect } from "react";
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
import { Unit, UnitSchema } from "@/validations/unit"
import { updateUnit } from "@/lib/actions/updateUnit"

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: Unit | null;
    onUpdated: () => void;
}

export function UnitEditDialog({ open, onOpenChange, unit, onUpdated }: Props) {
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

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                onOpenChange(isOpen);
                if (!isOpen) {
                    reset();
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>単位編集</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
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
                <DialogFooter>
                    <Button onClick={handleSubmit(onSubmit)}>保存</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
