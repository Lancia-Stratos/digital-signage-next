'use client';

import { useForm } from 'react-hook-form';
import { Unit, UnitSchema } from '@/validations/unit';
import { zodResolver } from '@hookform/resolvers/zod';



export default function Page() {
    const { register, handleSubmit, reset, formState } = useForm<Unit>({
        resolver: zodResolver(UnitSchema),
    });

    const onSubmit = (data: Unit) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className='border border-gray-300 rounded-md p-2' {...register('name')} placeholder="単位名" />
            <br />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md' type="button" onClick={() => reset()}>Reset</button>
            <br />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md' type="submit">Submit</button>
            <br />
            {formState.errors.name && <p>{formState.errors.name.message}</p>}
        </form>
    );
}