import { UseFormReturn } from "react-hook-form";
import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Unit } from "@/validations/unit";
import { UnitDeleteAlert } from "./UnitDeleteAlert";
import { UnitWithId } from "@/validations/unit";

type Props = {
    unit: UnitWithId;
    form: UseFormReturn<Unit>;
    isSaving: boolean;
    isDeleting: boolean;
    onSubmit: (data: Unit) => void;
    onDelete: () => void;
};

export function UnitEditForm({ unit, form, isSaving, isDeleting, onSubmit, onDelete }: Props) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>単位編集</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <Button type="button" variant="outline" disabled={isSaving}>
                                キャンセル
                            </Button>
                        </DialogClose>
                        <UnitDeleteAlert
                            unit={unit}
                            isDeleting={isDeleting}
                            onDelete={onDelete}
                            disabled={isSaving}
                        />
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
} 