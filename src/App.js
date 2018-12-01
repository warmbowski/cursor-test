import React, { useState, useEffect } from "react";
import { createBinder } from 'immutable-binder';

import { Order } from "./Order";

const orderData = [
    {name: "Burger", quantity: 2, price: 5.0},
    {name: "Salad", quantity: 1, price: 4.50},
    {name: "Coke", quantity: 3, price: 1.50}
];

export const OrderContext = React.createContext();

const useBinderStore = (initValue = {}) => {
  const binder = createBinder(
        initValue,
        binderStore => {
            setBinderStore(binderStore);
        }
    );
  const [binderStore, setBinderStore] = useState(binder);
  return binderStore;
}

// const fetchData = async (api) => {
//     const res = await fetch(api);
//     const data = await res.json();
//     console.log(data, orderData);
    
// }

const useApi = (apiUrl, name, binder, fakeData) => {
    console.log(name);
    useEffect(() => {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => binder.set(name, fakeData ? fakeData : data))
        .catch(err => console.log(err));
    }, []);

    return binder;
};

export const App = () => {
    const binderStore = useBinderStore();
    const orderApiUrl = 'https://my-json-server.typicode.com/typicode/demo/posts'
    // useApi(orderApiUrl, 'postBinder', binderStore)
    useApi(orderApiUrl, 'orderBinder', binderStore, orderData);

    console.log(binderStore)

    return (
        <OrderContext.Provider value={ binderStore }>
            <section>
                <h1>Your Order:</h1>
                <Order />
            </section>
        </OrderContext.Provider>
    );
}
