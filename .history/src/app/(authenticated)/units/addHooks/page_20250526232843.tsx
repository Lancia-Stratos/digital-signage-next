import React from 'react';
import { useForm } from 'react-hook-form';

function MyForm() {
    const { register, handleSubmit, watch, reset, setValue, getValues, trigger, formState } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleReset = () => {
        reset();
    };

    export default function Page() {
        return (
            <div>test</div>
        );
    }