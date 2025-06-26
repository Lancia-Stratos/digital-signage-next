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

type Props = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess, children }: Props) {
    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<Unit>({
        mode: "onChange",
        resolver: zodResolver(UnitSchema),
        defaultValues: { name: unit.name }
    });

    useEffect(() => {
        if (open) {
            form.reset({ name: unit.name });
        }
    }, [unit, open, form]);

    const handleSave = async (data: Unit) => {
        setIsSaving(true);
        try {
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
        } catch {
            form.setError('name', { message: '更新に失敗しました' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteUnit(unit.id);
            if (result.success) {
                toast.success(`単位「${unit.name}」を削除しました`);
                setOpen(false);
                onSuccess?.();
            } else {
                toast.error('削除に失敗しました');
            }
        } catch {
            toast.error('削除に失敗しました');
        } finally {
            setIsDeleting(false);
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
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
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
                        <DialogFooter>

                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? "保存中..." : "保存"}
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="" disabled={isSaving}>キャンセル</Button>
                            </DialogClose>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="button" variant="destructive" disabled={isSaving}>
                                        削除
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>削除確認</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            単位「{unit.name}」を削除しますか？この操作は取り消せません。
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                            {isDeleting ? "削除中..." : "削除する"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
