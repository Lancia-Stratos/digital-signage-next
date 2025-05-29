'use client';

import { useForm } from 'react-hook-form';
import { Unit, UnitSchema } from '@/validations/unit';


export default function Page() {
    const { register, handleSubmit, reset, formState } = useForm();

    const onSubmit = (data: Unit) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder="First Name" />
            <input {...register('lastName')} placeholder="Last Name" />
            <button type="button" onClick={() => reset()}>Reset</button>
            <button type="submit">Submit</button>
            {formState.errors.firstName && <p>{formState.errors.firstName.message}</p>}
        </form>
    );
}