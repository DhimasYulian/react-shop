import React, { Component } from 'react'

class Products extends Component {
    render() {
        const { addToCart } = this.props;
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={`#${product._id}`}>
                                    <img src={product.image} alt={product.title} />
                                    <h3>
                                        {product.title}
                                    </h3>
                                </a>
                                <div className="product-price">
                                    <div>{`$ ${product.price}`}</div>
                                    <button className="button primary" onClick={() => addToCart(product)} >Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Products;
