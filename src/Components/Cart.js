import React, {useContext} from 'react';
import { Global } from '../App';

function Cart() {
    const {product,add,productList,total,net,shipment,increment,decrement,reset} = useContext(Global);
    return (
        <div>
            <div className="container">
                <h2 className='m-4 text-center'>Welcome to the Place</h2>
                <div className="row">
                    {product.map((item, i) => {
                        return (
                            <div className="col-md-4" key={i}>
                                <div className="col-md-12">
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={item.picture} alt="suit" />
                                        <div className="card-body">
                                            <h4 className="card-title">{item.name}</h4>
                                            <h5 className="card-title">Price : {item.price}</h5>
                                            <button className='btn btn-primary' onClick={() => { add(i) }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="col-md-3 bg-dark text-white fixed-bottom" style={{fontSize: "20px"}}><img src="/pics/cart.webp" alt="cart" style={{ width: "100px", height: "100px" }} /> NetPayment: {net} </div>
                </div>
                <h2 className='m-4'>Added Products</h2>
                <center>
                    <table className='table table-bordered text-center'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Add item</th>
                                <th>Quantity</th>
                                <th>Remove item</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><button className='btn btn-primary' onClick={() => { increment(i) }} >+</button></td>
                                        <td>{item.quantity}</td>
                                        <td><button className='btn btn-danger' onClick={() => { decrement(i) }} >-</button></td>
                                        <td><img src={item.picture} alt="imag" style={{ width: "100px", height: "100px" }} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </center>
                <center>
                    <table className='table table-bordered text-center' style={{width: "50%"}}>
                        <thead>
                            <tr>
                                <th>Total Payment</th>
                                <th>Shipping Charges</th>
                                <th>Net Payment</th>
                                <th>Reset</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{total}</td>
                                <td>{shipment}</td>
                                <td>{net}</td>
                                <td><button className='btn btn-danger' onClick={reset}>Reset</button></td>
                            </tr>
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    );
}

export default Cart;