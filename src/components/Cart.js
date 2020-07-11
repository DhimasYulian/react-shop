import React, { Component } from 'react'

export default class Cart extends Component {
    render() {
        const { cartItems, removeItem } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Your Cart is Empty</div> :
                    <div className="cart cart-header">You have {cartItems.length} products in your cart </div>
                }
                <div>
                    <div className="cart">
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
                    </div>
                    {cartItems.length !== 0 && (
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total {" "}
                                    ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>
                                <button className="button primary">Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
