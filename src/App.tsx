import { Component } from 'react';
import './App.scss';
import {  connect } from 'react-redux';
import ProductList from './components/ProductList';
import { bindActionCreators } from 'redux';
import { getUser } from './redux/ducks/user';
import { productsRequested } from './redux/ducks/product';

class App extends Component<any, any> {
  componentDidMount() {
    this.props.getUser();
  }

  render () {
    const { products, loading, error } = this.props.products;

    return (
      <div className="App">
        <div className="App-header">
          Fake Store API
        </div>
        <ProductList productsRequested={this.props.productsRequested} products={products} loading={loading} error={error} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
    products: state.products,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getUser, productsRequested}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
