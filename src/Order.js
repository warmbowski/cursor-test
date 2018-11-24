import React, { useContext, Fragment } from "react";
import { OrderForm } from './OrderForm';
import { OrderContext } from './index';

export const Item = ({ item }) => {
    const increase = () => {
        item.quantity.setValue(item.quantity.getValue() + 1);
    }
    const subTotal= () => {
        return item.quantity.getValue() * item.price.getValue();
    }

    return(
        <div className="item" style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
            <a href="#" onClick={increase}>+</a>
            <span>{item.quantity.getValue()}</span>
            <span>{item.name.getValue()}</span>
            <span>${subTotal()}</span>
        </div>
    );
};


export const Order = () => {
    const { orderBinder } = useContext(OrderContext);

    return(
        <Fragment>
            <div>{orderBinder.map((item, idx) => <Item key={idx} item={item} />)}</div>
            <OrderForm orderBinder={orderBinder} />
        </Fragment>
    );
};
