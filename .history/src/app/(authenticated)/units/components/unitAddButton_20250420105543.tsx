import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// import { UnitAddForm } from "./unitAddForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UnitAddButton() {
    return (
        <>
            <Dialog>

                <DialogTrigger asChild>
                    <Button>追加</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle>単位追加</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                単位名
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}
