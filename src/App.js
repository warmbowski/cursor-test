import React, { useState, useEffect } from "react";
import { createBinder } from 'immutable-binder';
// import Cortex from 'cortexjs';

import { Order } from "./Order";

const orderData = [
    {name: "Burger", quantity: 2, price: 5.0},
    {name: "Salad", quantity: 1, price: 4.50},
    {name: "Coke", quantity: 3, price: 1.50}
];

export const OrderContext = React.createContext();

export const useBinderState = (initValue = {}) => {
  const binder = createBinder(
      initValue,
      (newRootBinder) => {
          setBinderState(newRootBinder);
      }
  );
  const [ binderState, setBinderState ] = useState(binder);
  if (window) window.binder = binderState;
  return binderState;
}

export const useApi = (apiUrl, name, rootBinder, fakeData) => {
    useEffect(() => {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => rootBinder.set(name, fakeData ? fakeData : data))
        .catch(err => console.log(err));
    }, []);

    return binder;
};

export const App = () => {
    const orderApiUrl = 'https://my-json-server.typicode.com/typicode/demo/posts'
    const stateBinder = useBinderState();
    useApi(orderApiUrl, 'orderBinder', stateBinder, orderData);
    // const postBinder = useBinderState([]);
    // useApi(orderApiUrl, 'postBinder', postBinder);

    // const store = { orderBinder };

    return (
        <OrderContext.Provider value={stateBinder}>
            <section>
                <h1>Your Order:</h1>
                <Order />
            </section>
        </OrderContext.Provider>
    );
}
