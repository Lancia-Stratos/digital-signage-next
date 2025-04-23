import Form from 'next/form'

export default function UnitAddPage() {
    return (
        <div>
            {/* shadcn/uiのフォームを使用して単位追加フォームを作成 */}
            {/* https://ui.shadcn.com/docs/components/form */}

            <h1>単位追加フォームテストページ</h1>
            <div className="pt-10">

                <Form action="/search">



                </Form>
            </div>
        </div>
    )
}