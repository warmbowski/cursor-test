import * as React from "react";
import { createBinder, Binder, binderMode } from 'immutable-binder';

import { OrderData } from './index';

class TextEditor extends React.Component<{binder: Binder<string>, label?: string, type?: string}, {}> {
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.binder.setValue(e.target.value);
    }

    render() {
        var {binder, label, type} = this.props;
        var value = binder.getValue();
        var error = binder.getExtras().error;

        return (
            <label>
                {label || ''}
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

const NumberEditor: React.FC<{label: string, binder: Binder<number>}> = ({label, binder}) => {
    var stringBinder = binder;
    return (
        <TextEditor label={label} binder={stringBinder} type='number' />
    );
}

type Props = {orderBinder: Binder<OrderData, binderMode.PreInitializedMode>};
type State = {formInitData: OrderData, formBinder: Binder<OrderData>};
export class OrderForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const formInitData: OrderData = { name: "", quantity: 0, price: 0 };

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

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (document.querySelector('[data-haserrors=true]')) {
            alert('There are errors in the form');
            return;
        }
        this.props.orderBinder.push(this.state.formBinder.getValue());
        this.state.formBinder.setValue(this.state.formInitData);
    }

    validate(binder) {
        if (!binder.name.hasValue()) {
            binder.name.updateExtrasInCurrentBinder({error: 'You must specify a product name'});
        }
        if (!binder.price.hasValue()) {
            binder.price.updateExtrasInCurrentBinder({error: 'You must specify a price'});
        }
        var qty = binder.quantity.getValue();
        if (qty <= 1 || qty >= 10) {
            binder.quantity.updateExtrasInCurrentBinder({error: 'Quantity must be between 1 and 10'});
        }
        return binder;
    }

    render() {
        var { formBinder } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <TextEditor label='Name' binder={formBinder.name}/>
                <NumberEditor label='Quantity' binder={formBinder.quantity}/>
                <NumberEditor label='Price' binder={formBinder.price}/>
                <button>Save</button>
            </form>
        );
    }
};
