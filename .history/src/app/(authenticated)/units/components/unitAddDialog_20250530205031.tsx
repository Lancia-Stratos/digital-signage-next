'use client';
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unit, UnitSchema } from "@/validations/unit"
import { createUnit } from "@/lib/actions/createUnit"

export function UnitAddDialog() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
    });

    const onSubmit = async (data: Unit) => {
        await createUnit(data);
        reset();
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>追加</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>単位追加</DialogTitle>
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
                            defaultValue=""
                            className="col-span-3"
                            {...register('name')}
                            placeholder="単位名"
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
