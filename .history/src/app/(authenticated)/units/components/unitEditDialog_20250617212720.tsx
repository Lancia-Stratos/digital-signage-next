'use client';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { UnitWithId, UnitSchema, Unit } from "@/validations/unit"
import { updateUnit } from "@/lib/actions/updateUnit"
import { deleteUnit } from "@/lib/actions/deleteUnit"

// 型定義
type UnitEditDialogProps = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess }: UnitEditDialogProps) {
    const [open, setOpen] = useState(false);

    // フォーム設定
    const form = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
        defaultValues: { name: unit.name }
    });

    // フォームリセット
    useEffect(() => {
        if (open) {
            form.reset({ name: unit.name });
        }
    }, [open, unit, form]);

    // 保存
    const onSubmit = async (data: Unit) => {
        const result = await updateUnit(unit.id, { name: data.name });
        if (result.success) {
            toast.success(`単位「${data.name}」を更新しました`);
            setOpen(false);
            onSuccess?.();
        } else if (result.error === 'duplicate') {
            form.setError('name', { message: 'すでに登録されています' });
        } else {
            form.setError('name', { message: '更新に失敗しました' });
        }
    };

    // 削除
    const onDelete = async () => {
        const result = await deleteUnit(unit.id);
        if (result.success) {
            toast.success(`単位「${unit.name}」を削除しました`);
            setOpen(false);
            onSuccess?.();
        } else {
            toast.error('削除に失敗しました');
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>編集</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>単位名</FormLabel>
                                        <FormControl>
                                            <Input placeholder="単位名を入力" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "保存中..." : "保存"}
                            </Button>
                        </form>
                    </Form>
                    <Button onClick={onDelete} variant="destructive">
                        削除
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
