import React, { Component } from 'react'
import './App.css';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }
  createOrder = (order) => {
    alert(`Save your order for ${order.name}`)
  }
  removeItem = (item) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== item._id)
    })
    localStorage.setItem("cartItems",
      JSON.stringify(cartItems.filter(x => x._id !== item._id)))
  }
  addTocart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    })
    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({
      cartItems: cartItems
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }
  sortProduct = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: e.target.value,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
              ? 1
              : -1
      ))
    })
  }

  filterProduct = (e) => {
    if (e.target.value == "") {
      this.setState({
        size: e.target.value,
        products: data.products
      })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(product => product.availableSize.indexOf(e.target.value) >= 0)
      })
    }
  }
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <header>
            <a href="">React Redux Shop</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter count={this.state.products.length} sort={this.state.sort} size={this.state.size} filterProduct={this.filterProduct} sortProduct={this.sortProduct} />
                <Products products={this.state.products} addToCart={this.addTocart} />
              </div>
              <div className="side">
                <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeItem={this.removeItem} />
              </div>
            </div>
          </main>
          <footer>
            This is Footer
        </footer>
        </div>
      </Provider>
    )
  }
}


export default App;
