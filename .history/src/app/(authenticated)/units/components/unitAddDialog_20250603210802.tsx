'use client';
import { useState } from "react";
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
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unit, UnitSchema } from "@/validations/unit"
import { createUnit } from "@/lib/actions/createUnit"
import { useRouter } from 'next/navigation';

export function UnitAddDialog() {
    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
    });

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: Unit) => {
        const result = await createUnit(data);
        if (result.success) {
            reset();
            setOpen(false);
            router.refresh();
            toast.success(`単位「${data.name}」を追加しました`, {
                position: "top-right",
                style: {
                    backgroundColor: '#3b82f6',
                    color: 'white'
                }
            });
        } else if (result.error === 'duplicate') {
            toast.error('すでに登録されています');
        } else {
            toast.error('登録に失敗しました');
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        reset();
                    }
                }}
            >

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

        </>
    )
}
