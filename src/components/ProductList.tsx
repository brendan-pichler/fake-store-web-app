import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from '../redux/ducks/product';

class ProductList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            pageNumber: 1
        }
    }

    render() {
        return (
            <Container fluid>
                {this.props.error ? this.props.error.message : this.props.loading ? "Loading..." : this.props.products.map((product: Product) => {
                    return (
                        <Row>
                            <Col>
                                Title: {product.title}, Price: {product.price}
                            </Col>
                        </Row>
                    )
                })}
                <Row>
                    <Col></Col>
                </Row>
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