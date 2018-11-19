import * as React from "react";
import { Fragment } from 'react';

import { OrderForm } from './OrderForm';
import { OrderContext, OrderData } from './index';

export class Item extends React.Component<OrderData, {}> {
    increase = () => {
        var quantity = this.props.item.quantity.getValue();
        this.props.item.quantity.setValue(quantity + 1);
    }

    subTotal= () => {
        return this.props.item.quantity.getValue() * this.props.item.price.getValue();
    }

    render() {
        return(
        <div className="item" style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
            <a href="#" onClick={this.increase}>+</a>
            <span>{this.props.item.quantity.getValue()}</span>
            <span>{this.props.item.name.getValue()}</span>
            <span>${this.subTotal()}</span>
        </div>
        );
    }
};


export const Order: React.FC<{}> = () => {

    return(
        <OrderContext.Consumer>
            {(state) => (
                <Fragment>
                    <div>{state.orderBinder.map((item, idx) => <Item key={idx} item={item} />)}</div>
                    <OrderForm orderBinder={state.orderBinder} />
                </Fragment>
            )}
        </OrderContext.Consumer>
    );
};
