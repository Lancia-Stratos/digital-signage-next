import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UnitWithId, UnitSchema, Unit } from "@/validations/unit";
import { updateUnit } from "@/lib/actions/updateUnit";
import { deleteUnit } from "@/lib/actions/deleteUnit";

export function useUnitEdit(unit: UnitWithId, onSuccess?: () => void) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<Unit>({
    mode: "onChange",
    resolver: zodResolver(UnitSchema),
    defaultValues: { name: unit.name },
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
      } else if (result.error === "duplicate") {
        form.setError("name", { message: "すでに登録されています" });
      } else {
        form.setError("name", { message: "更新に失敗しました" });
      }
    } catch {
      form.setError("name", { message: "更新に失敗しました" });
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
        toast.error("削除に失敗しました");
      }
    } catch {
      toast.error("削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    open,
    setOpen,
    isSaving,
    isDeleting,
    form,
    handleSave,
    handleDelete,
  };
}
