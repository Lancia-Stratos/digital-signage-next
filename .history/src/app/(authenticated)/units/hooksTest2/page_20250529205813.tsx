'use client';

import { useForm } from 'react-hook-form';
import { Unit, UnitSchema } from '@/validations/unit';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUnit } from '@/lib/actions/createUnit';



export default function Page() {
    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        mode: 'onChange',
        resolver: zodResolver(UnitSchema),
    });

    const onSubmit = async (data: Unit) => {
        // const formData = new FormData();
        // formData.append('name', data.name);

        await createUnit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <input
                        className='border border-gray-300 rounded-md p-2'
                        {...register('name')}
                        placeholder="単位名"
                    />
                    {formState.errors.name && (
                        <p className="text-sm text-red-600">
                            {formState.errors.name?.message}
                        </p>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                        type="button"
                        onClick={() => reset()}
                    >
                        Reset
                    </button>
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}