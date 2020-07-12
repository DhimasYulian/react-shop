import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order);
    }
    render() {
        const { cartItems, removeItem } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Your Cart is Empty</div> :
                    <div className="cart cart-header">You have {cartItems.length} products in your cart </div>
                }
                <div>
                    <div className="cart">
                        <Fade right cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {item.count} x ${item.price}
                                                <button className="button remove" onClick={() => removeItem(item)}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total {" "}
                                    ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                    </div>
                                    <button onClick={() => { this.setState({ showCheckout: !this.state.showCheckout }) }} className="button primary">{this.state.showCheckout ? "Cancel" : "Proceed"}</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="name">Your Name</label>
                                                    <input type="text" name="name" id="name" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <label htmlFor="email">Your Email</label>
                                                    <input type="email" name="email" id="email" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <label htmlFor="address">Your Address</label>
                                                    <input type="text" name="address" id="name" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    }
}
