'use client';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UnitWithId } from "@/validations/unit";
import { useUnitEdit } from "./hooks/useUnitEdit";
import { UnitEditForm } from "./UnitEditForm";

type Props = {
    unit: UnitWithId;
    onSuccess?: () => void;
    children: React.ReactNode;
}

export function UnitEditDialog({ unit, onSuccess, children }: Props) {
    const {
        open,
        setOpen,
        isSaving,
        isDeleting,
        form,
        handleSave,
        handleDelete
    } = useUnitEdit(unit, onSuccess);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <UnitEditForm
                    unit={unit}
                    form={form}
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                    onSubmit={handleSave}
                    onDelete={handleDelete}
                />
            </DialogContent>
        </Dialog>
    );
}
