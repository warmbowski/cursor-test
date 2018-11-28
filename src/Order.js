import React, { useContext, Fragment } from "react";
import { OrderForm } from './OrderForm';
import { OrderContext } from './App';


export const Order = () => {
    const { orderBinder } = useContext(OrderContext);


    return(
        <Fragment>
            <div>{orderBinder.map((item, idx) => <Item key={idx} item={item} />)}</div>
            <OrderForm orderBinder={orderBinder} />
        </Fragment>
    );
};


export const Item = ({ item }) => {
    const increase = () => {
        item.quantity.setValue(item.quantity.getValue() + 1);
    }
    const decrease = () => {
        const qty = item.quantity.getValue();
        if (qty > 0) item.quantity.setValue(qty - 1);
    }
    const subTotal= () => {
        return item.quantity.getValue() * item.price.getValue();
    }


    return(
        <div className="item" style={{ display: 'flex' }}>
            <div style={{ width: '30px', display: 'flex', justifyContent: 'space-around' }}>
                <a href="#" onClick={increase}>+</a>
                <a href="#" onClick={decrease}>-</a>
            </div>
            <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.quantity.getValue()}</span>
                <span>{item.name.getValue()}</span>
                <span>${subTotal()}</span>
            </div>
        </div>
    );
};
