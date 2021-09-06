import { Component } from 'react';
import './App.css';
import {  connect } from 'react-redux';
import ProductList from './components/ProductList';
import { bindActionCreators } from 'redux';
import { getUser } from './redux/ducks/user';
import { productsRequested } from './redux/ducks/product';

class App extends Component<any, any> {
  componentDidMount() {
    this.props.getUser();
    this.props.productsRequested();
  }

  render () {
    const { products, loading, error } = this.props.products;

    return (
      <div className="App">
        <ProductList products={products} loading={loading} error={error} />
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
