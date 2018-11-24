import React from "react";


export const TextInput = ({ binder, label, ...props}) => {
    const meta = binder.getExtras();

    return (
        <label>
            {label}
            <input
                {...props}
                value={binder.getValue()} 
                title={meta.error} 
                onChange={props.onChange || (e => binder.setValue(e.target.value))}
                data-haserrors={!!meta.error}
            />
        </label>
    );
}

export const NumberInput = ({label, binder, ...props}) => {
    return (
        <TextInput
            {...props}
            label={label}
            binder={binder}
            type='number'
            onChange={e => binder.setValue(Number(e.target.value))}
        />
    );
}
