import { Component } from 'react'
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { User } from '../redux/ducks/user';

class UserModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.getUserDisplayObject = this.getUserDisplayObject.bind(this);
    }

    getUserDisplayObject() {
        return {
            "Full Name": `${this.props.user.name.firstname} ${this.props.user.name.lastname}`,
            "Email": this.props.user.email,
            "User Name": this.props.user.username,
            "Password": this.props.user.password,
            "Address": `${this.props.user.address.number} ${this.props.user.address.street}, ${this.props.user.address.city}.`
        }
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
                        My User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        {this.props.user ? Object.entries(this.getUserDisplayObject()).map(([key, value]) => {
                            return <ListGroup.Item>{key}: {value}</ListGroup.Item>
                        }) : "Loading user information..."}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

interface Props {
    onHide: () => void;
    show: boolean;
    user: User;
}

interface State {}

export default UserModal;