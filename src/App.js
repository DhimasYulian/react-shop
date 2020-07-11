import React, { Component } from 'react'
import './App.css';
import data from './data.json'
import Products from './components/Products';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
  }
  render() {
    return (
      <div className="container">
        <header>
          <a href="">React Redux Shop</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="side">
              Side
            </div>
          </div>
        </main>
        <footer>
          This is Footer
        </footer>
      </div>
    )
  }
}


export default App;
