import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UnitAddForm } from "./unitAddForm"

export function UnitAddButton() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>追加</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>単位を追加</DialogTitle>
                        <UnitAddForm />

                    </DialogHeader>

                    <DialogFooter>
                        <Button>保存</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}
