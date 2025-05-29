'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
    firstName: string;
    lastName: string;
};

export default function Page() {
    const { register, handleSubmit, watch, reset, setValue, getValues, trigger, formState } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    const handleReset = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder="First Name" />
            <input {...register('lastName')} placeholder="Last Name" />
            <button type="button" onClick={handleReset}>Reset</button>
            <button type="submit">Submit</button>
            {formState.errors.firstName && <p>{formState.errors.firstName.message}</p>}
        </form>
    );
}
