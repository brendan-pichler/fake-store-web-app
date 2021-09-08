import { Component } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Product, ProductFilter } from '../redux/containers/product';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination'
import ProductSearch from './ProductSearch';

class ProductList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activePage: 1,
            itemsPerPage: window.innerWidth >= 576 ? window.innerWidth >= 768 ? window.innerWidth >= 992 ? 6 : 4 : 3 : 3,
            productFilter: undefined
        }

        this.searchWithFilter = this.searchWithFilter.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setActivePage(activePage: number) {
        this.setState({
            activePage,
        });
    }

    searchWithFilter() {
        this.props.productsRequested(this.state.productFilter);
    }

    setFilter(productFilter: ProductFilter) {
        this.setState({
            productFilter,
            activePage: 1,
        }, () => this.searchWithFilter());
    }

    componentDidMount() {
        this.searchWithFilter();
    }

    render() {
        return (
            <Container className="ProductList" fluid>
                    <Row className="ProductFilters">
                        <Col><ProductSearch setFilter={this.setFilter} productFilter={this.state.productFilter} /></Col>
                    </Row>
                    <Row className="ProductFilters">
                        <Col md={3} sm={12}></Col>
                        <Col md={6} xs={12}><ProductPagination setActivePage={this.setActivePage} itemCount={this.props.products?.length} itemsPerPage={this.state.itemsPerPage} activePage={this.state.activePage} /></Col>
                        <Col md={3} xs={12} className="page-number-text">Displaying {(this.state.activePage - 1) * this.state.itemsPerPage + 1} - {this.state.activePage * this.state.itemsPerPage} of {this.props.products?.length} items.</Col>
                    </Row>
                    <Row>
                        {this.props.error ? 
                        this.props.error.message : 
                        this.props.loading ? 
                        <div className="spinner-div">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div> : 
                        this.props.products.slice((this.state.activePage - 1) * this.state.itemsPerPage, this.state.activePage * this.state.itemsPerPage)
                            .map((product: Product) => {
                                return (
                                    <Col xs={12} md={6} lg={4} key={product.title.toString()}>
                                        <ProductCard product={product}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row className="ProductFilters">
                        <Col><ProductPagination setActivePage={this.setActivePage} itemCount={this.props.products.length} itemsPerPage={this.state.itemsPerPage} activePage={this.state.activePage} /></Col>
                    </Row>
            </Container>
        )
    }
}

interface Props {
    products: Product[];
    loading: boolean;
    error: Error;
    productsRequested: (productFilter: ProductFilter) => void;
}

interface State {
    activePage: number;
    itemsPerPage: number;
    productFilter: ProductFilter;
}

export default ProductList;