'use client';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogTrigger,
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
import { UnitWithId } from "@/validations/unit"
import { updateUnit } from "@/lib/actions/updateUnit"
import { deleteUnit } from "@/lib/actions/deleteUnit"

// フォームスキーマ
const formSchema = z.object({
    name: z.string()
        .min(1, "単位名は必須です")
        .max(50, "単位名は50文字以内で入力してください")
        .transform(val => val.trim())
});

type FormData = z.infer<typeof formSchema>;

type Props = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess, children }: Props) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: unit.name }
    });

    useEffect(() => {
        if (open) {
            form.reset({ name: unit.name });
            setShowDeleteConfirm(false);
        }
    }, [unit, open, form]);

    const handleSubmit = async (data: FormData) => {
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

    const handleDeleteConfirm = async () => {
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
            setShowDeleteConfirm(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                {showDeleteConfirm ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>削除確認</DialogTitle>
                            <DialogDescription>
                                単位「{unit.name}」を削除しますか？この操作は取り消せません。
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                            >
                                キャンセル
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "削除中..." : "削除する"}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>単位編集</DialogTitle>
                            </DialogHeader>

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
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    削除
                                </Button>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? "保存中..." : "保存"}
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button" variant="ghost">
                                        キャンセル
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
