import { Component } from 'react';
import './App.scss';
import {  connect } from 'react-redux';
import ProductList from './components/ProductList';
import UserRibbon from './components/UserRibbon';
import { bindActionCreators } from 'redux';
import { getUser } from './redux/ducks/user';
import { productsRequested } from './redux/ducks/product';
import { cartRequested } from './redux/ducks/cart'

class App extends Component<any, any> {
  componentDidMount() {
    this.props.getUser();
    this.props.cartRequested();
  }

  render () {
    const { products, loading, error } = this.props.products;

    return (
      <div className="App">
          <div className="App-content">
            <div className="App-header">
              Fake Store Web Application
            </div>
            <UserRibbon user={this.props.user} cart={this.props.cart.cart} />
            <ProductList productsRequested={this.props.productsRequested} products={products} loading={loading} error={error} />
          </div>
        <div className="App-footer">
            Fake Store Web Application - Brendan Pichler - brendanpichler@gmail.com
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
    products: state.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ 
    getUser, 
    productsRequested,
    cartRequested,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
