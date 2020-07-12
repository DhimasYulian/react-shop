import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

class Products extends Component {
    constructor() {
        super();
        this.state = {
            product: null
        }
    }
    openModal = (product) => {
        this.setState({ product })
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state;
        const { addToCart } = this.props;
        return (
            <>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={`#${product._id}`} onClick={() => this.openModal(product)} >
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
                </Fade>
                {product && (
                    <Modal isOpen onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-desc">
                                    <strong> <p>{product.title}</p> </strong>
                                    <p>{product.description}</p>
                                    <p>
                                        Available Sizes {" "}
                                        {product.availableSize.map(size => (
                                            <span>
                                                {" "}
                                                <button className="button">{size}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>$ {product.price}</div>
                                        <button className="button primary" onClick={() => {
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </>
        )
    }
}

export default Products;
