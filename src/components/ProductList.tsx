import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from '../redux/ducks/product';
import ProductCard from './ProductCard';

class ProductList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            pageNumber: 1
        }
    }

    render() {
        return (
            <Container className="ProductList" fluid>
                <Container>
                    <Row className="ProductFilters">
                        <Col>Pagination</Col>
                        <Col>Search bar and filter</Col>
                    </Row>
                <Row>
                {this.props.error ? this.props.error.message : this.props.loading ? "Loading..." : this.props.products.map((product: Product) => {
                    return (
                        <Col xs={12} sm={6} md={4} key={product.title.toString()}>
                            <ProductCard product={product}/>
                        </Col>
                    )
                })}
                </Row>
                </Container>
            </Container>
        )
    }
}

interface Props {
    products: Product[];
    loading: boolean;
    error: Error;
}

interface State {
    pageNumber: number;
}

export default ProductList;