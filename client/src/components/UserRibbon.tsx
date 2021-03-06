import { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserModal from './UserModal';
import CartModal from './CartModal';
import { User } from '../redux/containers/user';
import { Cart } from '../redux/containers/cart';

class UserRibbon extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showCartModal: false,
            showUserModal: false,
        }

        this.openCartModal = this.openCartModal.bind(this);
        this.openUserModal = this.openUserModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openCartModal() {
        this.setState({
            showCartModal: true,
        });
    }

    openUserModal() {
        this.setState({
            showUserModal: true,
        });
    }

    closeModal() {
        this.setState({
            showCartModal: false,
            showUserModal: false,
        })
    }

    render() {
        return (
            <>
            <header className="user-ribbon">
                <Container className="ribbon-container"> 
                    <Row>
                        <Col className="col-left">
                            <Button variant="light" onClick={this.openUserModal} className="ribbon-button">My User</Button>
                        </Col>
                        <Col className="col-right">
                            <Button variant="light" onClick={this.openCartModal} className="ribbon-button">My Cart</Button>
                        </Col>
                    </Row>
                </Container>
            </header>
            <UserModal
                show={this.state.showUserModal}
                onHide={this.closeModal}
                user={this.props.user}
            />
            <CartModal
                show={this.state.showCartModal}
                onHide={this.closeModal}
                cart={this.props.cart}
            />
            </>
        )
    }
}

interface Props {
    user: User;
    cart: Cart;
}

interface State {
    showUserModal: boolean;
    showCartModal: boolean;
}

export default UserRibbon