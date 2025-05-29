'use client';
import { useForm } from 'react-hook-form';


type FormValues = {
    firstName: string;
    lastName: string;
};

export default function Page() {
    const { register, handleSubmit, reset, formState } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    const handleReset = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder="First Name" />
            <br />
            <input {...register('lastName')} placeholder="Last Name" />
            <br />
            <button type="button" onClick={handleReset}>Reset</button>
            <br />
            <button type="submit">Submit</button>
            <br />
            {formState.errors.firstName && <p>{formState.errors.firstName.message}</p>}
        </form>
    );
}
