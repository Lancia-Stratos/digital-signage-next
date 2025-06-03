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

export function UnitEditDialog({ unit, open, onOpenChange }: {
    unit: Unit | null,
    open: boolean,
    onOpenChange: (isOpen: boolean) => void
}) {
    const { register, handleSubmit, reset, setValue, formState } = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
    });

    useEffect(() => {
        if (unit) {
            setValue('name', unit.name);
        } else {
            reset();
        }
    }, [unit, setValue, reset]);

    const onSubmit = async (data: Unit) => {
        if (!unit) return;
        onOpenChange(false);
        toast.success(`単位「${data.name}」を更新（仮）`);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
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
    );
}
