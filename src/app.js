import React from "react";
import {createBinder} from 'immutable-binder';

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
    constructor(props) {
        super(props);
        this.state = { 
            orderBinder: createBinder(props.order, this.handleChange)
        };
    }
    
    handleChange = (newRootBinder) => {
        this.setState({ orderBinder: newRootBinder });
    }

    render() {
        var items = this.state.orderBinder.map((item, idx) => <Item key={idx} item={item} />);

        return(
        <div>{items}</div>
        );
    }
};
