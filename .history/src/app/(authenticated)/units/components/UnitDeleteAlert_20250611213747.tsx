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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UnitWithId } from "@/validations/unit";

type Props = {
    unit: UnitWithId;
    isDeleting: boolean;
    onDelete: () => void;
    disabled?: boolean;
};

export function UnitDeleteAlert({ unit, isDeleting, onDelete, disabled }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={disabled}>
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
                    <AlertDialogAction onClick={onDelete} disabled={isDeleting}>
                        {isDeleting ? "削除中..." : "削除する"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 