import React, { useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBinder } from 'immutable-binder';

import { Order } from "./Order";

const orderData = [
    {name: "Burger", quantity: 2, price: 5.0},
    {name: "Salad", quantity: 1, price: 4.50},
    {name: "Coke", quantity: 3, price: 1.50}
];

export const OrderContext = React.createContext();

const App = () => {
    const orderBinder = createBinder(
        [],
        orderBinder => {
            setBinderStore({ orderBinder });
        }
    );
    const [binderStore, setBinderStore] = useState({ orderBinder });

    const fetchData = async () => {
        const res = await fetch('https://my-json-server.typicode.com/typicode/demo/posts');
        const data = await res.json();
        console.log(data, orderData);
        binderStore.orderBinder.setValue(orderData);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <OrderContext.Provider value={ binderStore }>
            <section>
                <h1>Your Order:</h1>
                <Order />
            </section>
        </OrderContext.Provider>
    );
}


ReactDOM.render(<App />, document.getElementById("app"));
