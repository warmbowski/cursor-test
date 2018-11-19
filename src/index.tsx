import * as React from "react";
import * as ReactDOM from "react-dom";
import { createPreInitializedBinder, ArrayBinder, binderMode } from 'immutable-binder';

import { Order } from "./Order";

export type OrderData = { name: String, quantity: number, price: number }
const orderData: Array<OrderData> = [
    {name: "Burger", quantity: 2, price: 5.0},
    {name: "Salad", quantity: 1, price: 4.50},
    {name: "Coke", quantity: 3, price: 1.50}
];


export type State = { orderBinder: ArrayBinder<OrderData, binderMode.PreInitializedMode> };
export const OrderContext = React.createContext<State | null>(null);


class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        let orderBinder = createPreInitializedBinder(
            orderData,
            orderBinder => {
                this.setState({ orderBinder });
            }
        );

        this.state = { orderBinder };
    }

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
