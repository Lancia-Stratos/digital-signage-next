'use client'

import Form from 'next/form'
import { createUnit } from '@/lib/actions/createUnit'
import { UnitSchema } from '@/validations/unit'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UnitAddPage() {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    return (
        <div>
            {/* shadcn/uiのフォームを使用して単位追加フォームを作成 */}
            {/* https://ui.shadcn.com/docs/components/form */}

            <h1>単位追加フォームテストページ</h1>
            <div className="pt-4">

                <Form action={async (formData: FormData) => {
                    try {
                        setIsSubmitting(true);
                        // バリデーションを実行
                        const validationResult = UnitSchema.safeParse({
                            name: formData.get('name'),
                        });

                        if (!validationResult.success) {
                            // バリデーションエラーの場合
                            setError(validationResult.error.errors[0].message);
                            setIsSubmitting(false);
                            return;
                        }

                        // エラーをクリア
                        setError(null);

                        // フォーム送信前にエラーメッセージをクリア
                        setError(null);
                        await createUnit(formData);
                        router.push('/units');
                    } catch (error) {
                        console.error(error);
                        // エラーが発生した場合のみエラーメッセージを表示
                        if (error instanceof Error) {
                            setError(error.message);
                        } else {
                            setError('予期せぬエラーが発生しました');
                        }
                        setIsSubmitting(false);
                    }
                }}>
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                単位名
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="rounded-md border border-gray-300 px-3 py-2"
                                required
                                disabled={isSubmitting}
                            />
                            {error && (
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '保存中...' : '保存'}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}