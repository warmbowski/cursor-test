import React from "react";
import ReactDOM from "react-dom";


import { Order } from "./app";

var orderData = [
  {name: "Burger", quantity: 2, price: 5.0},
  {name: "Salad", quantity: 1, price: 4.50},
  {name: "Coke", quantity: 3, price: 1.50}
];

//Initialize binder with data and pass in a callback to run when data is updated.
// let rootBinder = createBinder(orderData, (newroot) => {
// 	rootBinder = newroot;
// });

// rootBinder[0].quantity.setValue(5);
// rootBinder.push({
// 	name: 'Fries',
// 	quantity: 7,
//   price: 1.00
// });

// console.log(rootBinder.getValue());

class HelloMessage extends React.Component {
  render() {
      return <div>
          <div className="container">
              <h1>Hello {this.props.name}</h1>
          </div>
          <Order order={orderData} />
      </div>
  }
}


ReactDOM.render(<HelloMessage name="Warmbowski" />, document.getElementById("app"));

// orderCortex.onUpdate(function(updatedOrder) {
//   orderComponent.setProps({order: updatedOrder});
// });