import Form from 'next/form'

export default function UnitAddPage() {
    return (
        <div>
            {/* shadcn/uiのフォームを使用して単位追加フォームを作成 */}
            {/* https://ui.shadcn.com/docs/components/form */}

            <h1>単位追加フォームテストページ</h1>

            import Form from 'next/form'

            export default function Page() {
  return (
            <Form action="/search">
                {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
                <input name="query" />
                <button type="submit">Submit</button>
            </Form>
            )
}
        </div>
    )
}