import Form from 'next/form'

export default function UnitAddPage() {
    return (
        <div>
            {/* shadcn/uiのフォームを使用して単位追加フォームを作成 */}
            {/* https://ui.shadcn.com/docs/components/form */}

            <h1>単位追加フォームテストページ</h1>
            <div className="pt-10">

                <Form action="/search">

                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="unitName" className="text-sm font-medium">
                                単位名
                            </label>
                            <input
                                type="text"
                                id="unitName"
                                name="unitName"
                                className="rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                保存
                            </button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    )
}