import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
                        <div>
                            test
                        </div>
                    </DialogHeader>

                    <DialogFooter>
                        <Button>保存</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}
