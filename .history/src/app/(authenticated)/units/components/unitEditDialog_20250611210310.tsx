'use client';
import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { UnitWithId } from "@/validations/unit"
import { updateUnit } from "@/lib/actions/updateUnit"
import { deleteUnit } from "@/lib/actions/deleteUnit"

type Props = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess, children }: Props) {
    const [name, setName] = useState(unit.name);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setName(unit.name);
        setShowDeleteConfirm(false);
        setError("");
    }, [unit, open]);

    const validateName = (value: string) => {
        if (!value.trim()) return "単位名は必須です";
        if (value.length > 50) return "単位名は50文字以内で入力してください";
        return "";
    };

    const handleSave = async () => {
        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSaving(true);
        setError("");

        try {
            const result = await updateUnit(unit.id, { name: name.trim() });
            if (result.success) {
                toast.success(`単位「${name}」を更新しました`);
                setOpen(false);
                onSuccess?.();
            } else if (result.error === 'duplicate') {
                setError('すでに登録されています');
            } else {
                setError('更新に失敗しました');
            }
        } catch {
            setError('更新に失敗しました');
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
            setShowDeleteConfirm(false);
        }
    };

    if (showDeleteConfirm) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>削除確認</DialogTitle>
                        <DialogDescription>
                            単位「{unit.name}」を削除しますか？この操作は取り消せません。
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                            キャンセル
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "削除中..." : "削除する"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>単位編集</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">単位名</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError("");
                            }}
                            placeholder="単位名を入力"
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(true)}>
                        削除
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "保存中..." : "保存"}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="ghost">キャンセル</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
