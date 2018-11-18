import React from "react";
import { OrderContext } from './index';

export class Item extends React.Component{
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


    export class Order extends React.Component{
    render() {

        return(
            <OrderContext.Consumer>
                {({ orderBinder }) => (
                    <div>{orderBinder.map((item, idx) => <Item key={idx} item={item} />)}</div>
                )}
            </OrderContext.Consumer>
        );
    }
};
