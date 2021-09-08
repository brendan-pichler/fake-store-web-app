import { Component } from 'react'
import { Modal, Button, Card, Row, Col, Container, ListGroup, Spinner } from 'react-bootstrap';
import { Cart } from '../redux/containers/cart';
import { Product } from '../redux/containers/product';
import { requestProduct } from '../redux/sagas/product';

class CartModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            cartProducts: [],
            totalPrice: 0,
        }

        this.getCartDisplayObject = this.getCartDisplayObject.bind(this);
        this.displayPrice = this.displayPrice.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.show && this.props.show && this.props.cart) {
            this.setState({
                loading: true,
            }, async () => {
                const cartProducts = (await Promise.all(this.props.cart.products.map((product) => requestProduct(product.productId)))).map((cartProduct: any) => {
                    const quantity = this.props.cart.products.find((v) => v.productId === cartProduct.id)?.quantity;
                    return {
                        ...cartProduct,
                        quantity
                    }
                });
                const totalPrice = cartProducts.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.quantity * currentValue.price;
                }, 0);
                this.setState({
                    cartProducts,
                    loading: false,
                    totalPrice,
                })
            })
        }
    }

    // This function rounds and then displays the correct amount of decimal points for a price
    displayPrice(price: number) {
        return `$${(+price.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
    }

    getCartDisplayObject() {
        return (
            <>
                {this.state.loading ? 
                    <div className="spinner-div">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div> :
                    <Container>
                    {this.state.cartProducts.map((cartProduct) => {
                        return (
                                <Row key={cartProduct.id}>
                                    <Col>
                                    <Card className="cart-card">
                                        <Card.Body>
                                        <Card.Title>{cartProduct.title}</Card.Title>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>Price: {this.displayPrice(cartProduct.price)}</ListGroup.Item>
                                                <ListGroup.Item>Quantity: {cartProduct.quantity}</ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Container>
                                                <Row>
                                                    <Col className="col-left">
                                                        Subtotal: {this.displayPrice(cartProduct.quantity * cartProduct.price)}
                                                    </Col>
                                                    <Col className="col-right">
                                                        <Button variant="danger">Remove</Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Footer>
                                    </Card>
                                    </Col>
                                </Row>
                        )
                    })}
                    </Container>
                }
            </>
        )
    }


    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                     My Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getCartDisplayObject()}
                </Modal.Body>
                <Modal.Footer>
                    <Container className="checkout-footer">
                        <Row>
                            <Col className="col-left">
                                Total: {this.displayPrice(this.state.totalPrice)}
                            </Col>
                            <Col className="col-right">
                                <Button variant="success" onClick={this.props.onHide}>Checkout</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        )
    }
}

interface Props {
    onHide: () => void;
    show: boolean;
    cart: Cart;
}

interface State {
    loading: boolean;
    cartProducts: (Product & { quantity: number })[];
    totalPrice: number;
}

export default CartModal;