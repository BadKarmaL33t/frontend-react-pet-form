import React, { useEffect } from 'react';

function RadioInput({ id, name, labelText, register, errors }) {
    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    const validationParams = {
        required: {
            checked: true,
            message: 'Dit veld is verplicht',
        },
        validate: {
            checked: (v) => v !== undefined || "selecteer je favoriete huisdier",
            value: (v) => v !== null || "selecteer je favoriete huisdier"
        }
    }

    return (
        <>
            <label htmlFor={id}>
            <input
                type="radio"
                id={id}
                value={id}
                {...register(name, validationParams)}
            />
            {labelText}</label>
            {errors[name] && <small>{errors[name].message}</small>}
        </>
    );
}

export default RadioInput;