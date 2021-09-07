import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product, ProductFilter } from '../redux/ducks/product';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination'
import ProductSearch from './ProductSearch';

class ProductList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activePage: 1,
            itemsPerPage: 4,
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
            productFilter
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
                        <Col><ProductPagination setActivePage={this.setActivePage} itemCount={this.props.products.length} itemsPerPage={this.state.itemsPerPage} activePage={this.state.activePage} /></Col>
                    </Row>
                    <Row>
                        {this.props.error ? 
                        this.props.error.message : 
                        this.props.loading ? 
                        "Loading..." : 
                        this.props.products.slice((this.state.activePage - 1) * this.state.itemsPerPage, this.state.activePage * this.state.itemsPerPage)
                            .map((product: Product) => {
                                return (
                                    <Col xs={12} sm={6} md={4} key={product.title.toString()}>
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
    productsRequested: any;
}

interface State {
    activePage: number;
    itemsPerPage: number;
    productFilter: ProductFilter;
}

export default ProductList;