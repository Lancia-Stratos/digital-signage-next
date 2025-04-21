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
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { UnitSchema } from "@/schemas/zod"

// 新規作成用のスキーマ（idとタイムスタンプを除外）
const createUnitSchema = UnitSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

type CreateUnitInput = z.infer<typeof createUnitSchema>

export function UnitAddButton() {
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            setIsLoading(true)

            // バリデーション
            const input: CreateUnitInput = { name }
            const validated = createUnitSchema.parse(input)

            // APIエンドポイントにPOSTリクエストを送信
            const response = await fetch("/api/units", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validated),
            })

            if (!response.ok) {
                throw new Error("保存に失敗しました")
            }

            toast({
                title: "単位を追加しました",
                description: `${name}を追加しました`,
            })

            // フォームをリセット
            setName("")
            setOpen(false)

            // 一覧を更新
            router.refresh()

        } catch (error) {
            if (error instanceof z.ZodError) {
                toast({
                    variant: "destructive",
                    title: "入力エラー",
                    description: error.errors[0].message,
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "エラー",
                    description: "単位の追加に失敗しました",
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>追加</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>単位追加</DialogTitle>
                        <DialogDescription>
                            新しい単位を追加します
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
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "保存中..." : "保存"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
