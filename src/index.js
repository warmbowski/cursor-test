import React from "react";
import ReactDOM from "react-dom";
import { createBinder } from 'immutable-binder';

import { Order } from "./app";

const orderData = [
    {name: "Burger", quantity: 2, price: 5.0},
    {name: "Salad", quantity: 1, price: 4.50},
    {name: "Coke", quantity: 3, price: 1.50}
];


export const OrderContext = React.createContext();

class App extends React.Component {
    state = {
        orderBinder: createBinder(
            orderData,
            (orderBinder) => {
                this.setState({ orderBinder });
            }
        )
    };

    render() {
        return (
            <OrderContext.Provider value={ this.state }>
                <section>
                    <h1>Your Order:</h1>
                    <Order />
                </section>
            </OrderContext.Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
