import React from "react";
import { createBinder } from 'immutable-binder';


class TextInput extends React.Component {
    handleChange = (e) => {
        if(typeof this.props.binder.getValue() === "number") {
            this.props.binder.setValue(Number(e.target.value));
        } else {
            this.props.binder.setValue(e.target.value);
        }
    }

    render() {
        var {binder, label, type} = this.props;
        var value = binder.getValue();
        var error = binder.getExtras().error;

        return (
            <label>
                {label}
                <input type={type || 'text'} 
                    value={value} 
                    title={error} 
                    onChange={this.handleChange}
                    data-haserrors={!!error}
                />
            </label>
        );
    }
}

const NumberInput = ({label, binder}) => {
    return (
        <TextInput label={label} binder={binder} type='number' />
    );
}


export class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        const formInitData = { name: '', quantity: 0, price: 0 };

        this.state = {
            formInitData,
            formBinder: this.validate(createBinder(
              formInitData,
              formBinder => {
                this.setState({ formBinder });
              }
            ))
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (document.querySelector('[data-haserrors=true]')) {
            alert('There are errors in the form');
            return;
        }
        this.props.orderBinder.push(this.state.formBinder.getValue());
        this.state.formBinder.setValue(this.state.formInitData);
    }

    validate(binder) {
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

    render() {
        var { formBinder } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <TextInput label='Name' binder={formBinder.name}/>
                <NumberInput label='Quantity' binder={formBinder.quantity}/>
                <NumberInput label='Price' binder={formBinder.price}/>
                <button>Save</button>
            </form>
        );
    }
};
