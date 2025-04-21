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
import { useState } from "react"
import { UnitCreateInputSchema } from "@/schemas/zod"
import { useRouter } from "next/navigation"

export function UnitAddButton() {
    const [name, setName] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            // バリデーション
            const validatedData = UnitCreateInputSchema.parse({
                name
            })

            // データの保存
            const response = await fetch('/api/units', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            })

            if (!response.ok) {
                throw new Error('保存に失敗しました')
            }

            // フォームをリセット
            setName("")
            setError(null)
            setIsOpen(false)
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError('入力内容を確認してください')
            }
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>追加</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>単位追加</DialogTitle>
                        <DialogDescription>
                            {error && <p className="text-red-500">{error}</p>}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                単位名
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSubmit}>保存</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
