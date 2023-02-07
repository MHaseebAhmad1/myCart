import { useState, createContext } from 'react';
import './App.css';
import Cart from './Components/Cart';

export const Global = createContext();
function App() {
  let product;
  if (localStorage.getItem("product") != null) {
    product = JSON.parse(localStorage.getItem("product"));
  }
  else {

    const products = [
      {
        name: "Pant Coat",
        price: 15000,
        quantity: 1,
        picture: "/pics/suit.jpg"
      },
      {
        name: "Shirt",
        price: 5000,
        quantity: 1,
        picture: "/pics/shirt.jpg"
      },
      {
        name: "Shoes",
        price: 4000,
        quantity: 1,
        picture: "/pics/shoe.webp"
      }
    ];
    localStorage.setItem("product", JSON.stringify(products));
    product = JSON.parse(localStorage.getItem("product"));
  }

  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const [shipment, setShipment] = useState(0);
  const [net1, setNet] = useState(JSON.parse(localStorage.getItem("net")));
  localStorage.setItem('net', JSON.stringify(net1));
  let net = JSON.parse(localStorage.getItem("net"));
  const [count, setCount] = useState([]);

  function add(index) {
    if (count.includes(index)) {
      for (let i = 0; i < count.length; i++) {
        if (count[i] === index) {
          increment(i);
        }
      }
    }
    else {
      var totalPayment = total + product[index].price * product[index].quantity;
      setProductList([...productList, product[index]]);
      setTotal(totalPayment);

      if (totalPayment >= 10000) {
        setNet(total + product[index].price * product[index].quantity);
        setShipment(0);
      }
      else {
        setShipment(1000);
        setNet(totalPayment + 1000);
      }
      setCount([...count, index]);
    }

  }
  function increment(index) {
    let newProductList = [...productList];
    newProductList[index].quantity++;
    setProductList(newProductList);
    var totalPayment = total + newProductList[index].price;
    setTotal(totalPayment);

    if (totalPayment >= 10000) {
      setNet(total + newProductList[index].price);
      setShipment(0);
    }
    else {
      setShipment(1000);
      setNet(totalPayment + 1000);
    }

  }
  function decrement(index) {
    if (productList[index].quantity > 0) {
      let newProductList = [...productList];
      newProductList[index].quantity--;
      setProductList(newProductList);
      let totalPayment = total - newProductList[index].price;
      setTotal(totalPayment);

      if (totalPayment >= 10000) {
        setNet(total - newProductList[index].price);
        setShipment(0);
      }
      else {
        setShipment(1000);
        setNet(totalPayment + 1000);
      }
    }
    else {
      let newProductList = [...productList];
      newProductList[index].quantity = 0;
      setProductList(newProductList);
      let totalPayment = total;
      setTotal(totalPayment);

      if (totalPayment >= 10000) {
        setNet(total);
        setShipment(0);
      }
      else {
        setShipment(1000);
        setNet(totalPayment + 1000);
      }
    }
  }

  function reset(){
    setTotal(0);
    setNet(0);
    setProductList([]);
    setCount([]);
  }

  return (
    <>
      <Global.Provider value={{ product: product, add: add, productList: productList, total: total, net: net, shipment: shipment, increment: increment, reset:reset, decrement: decrement }}>
        <Cart />
      </Global.Provider>
    </>
  );
}

export default App;
