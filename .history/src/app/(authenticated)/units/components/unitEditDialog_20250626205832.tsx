'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { UnitWithId, UnitSchema, Unit } from "@/validations/unit";
import { updateUnit } from "@/lib/actions/updateUnit";
import { deleteUnit } from "@/lib/actions/deleteUnit";

type UnitEditDialogProps = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess, children }: UnitEditDialogProps) {
    const [open, setOpen] = useState(false);
    const form = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
        defaultValues: { name: unit.name }
    });

    const closeDialog = () => {
        setOpen(false);
        onSuccess?.();
    };

    const handleSubmit = async (data: Unit) => {
        const result = await updateUnit(unit.id, data);
        if (result.success) {
            toast.success(`単位「${data.name}」を更新しました`);
            closeDialog();
        } else {
            form.setError('name', {
                message: result.error === 'duplicate' ? 'すでに登録されています' : '更新に失敗しました'
            });
        }
    };

    const handleDelete = async () => {
        const result = await deleteUnit(unit.id);
        if (result.success) {
            toast.success(`単位「${unit.name}」を削除しました`);
            closeDialog();
        } else {
            toast.error('削除に失敗しました');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>単位編集</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>単位名</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between gap-2">
                            <div className="flex gap-2">
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "保存中..." : "保存"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>キャンセル</Button>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="button" variant="destructive">削除</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>削除の確認</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            単位「{unit.name}」を削除しますか？この操作は取り消せません。
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>削除</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
