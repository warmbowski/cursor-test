import React, { useState } from "react";
import { createBinder } from 'immutable-binder';

import { TextInput, NumberInput } from './Inputs';


export const OrderForm = ({ orderBinder }) => {
    const formInitData = { name: '', quantity: 0, price: 0 };
    const formBinder = createBinder(
        formInitData,
        formBinder => {
            setState(formBinder);
        }
    );
    if (window) window.formBinder = formBinder;
    const formBinderWithMeta = validateInputs(formBinder);
    const [state, setState] = useState(formBinderWithMeta);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (document.querySelector('[data-haserrors=true]')) {
            alert('There are errors in the form');
            return;
        }
        orderBinder.push(state.getValue());
        state.setValue(formInitData);
    }


    return (
        <form onSubmit={handleSubmit}>
            <TextInput label='Name' binder={state.name}/>
            <NumberInput label='Quantity' binder={state.quantity}/>
            <NumberInput label='Price' binder={state.price}/>
            <button>Save</button>
        </form>
    );
}


const validateInputs = (binder) => {
    if (!binder.name.getValue()) {
        binder.name.updateExtrasInCurrentBinder({error: 'You must specify a product name'});
    }
    if (!binder.price.getValue()) {
        binder.price.updateExtrasInCurrentBinder({error: 'You must specify a price. Nothing is free'});
    }
    var qty = binder.quantity.getValue();
    if (qty < 1 || qty >= 10) {
        binder.quantity.updateExtrasInCurrentBinder({error: 'Quantity must be between 1 and 10'});
    }

    return binder;
}
