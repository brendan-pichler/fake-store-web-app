import { Component } from 'react'
import { Modal, Button, ListGroup, Spinner } from 'react-bootstrap';
import { User } from '../redux/ducks/user';

class UserModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.getUserDisplayObject = this.getUserDisplayObject.bind(this);
        this.sentenceToUpperCase = this.sentenceToUpperCase.bind(this);
    }

    sentenceToUpperCase = (sentence: string): string => {
        return sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    getUserDisplayObject() {
        return {
            "Full Name": this.sentenceToUpperCase(`${this.props.user.name.firstname} ${this.props.user.name.lastname}`),
            "Email": this.props.user.email,
            "User Name": this.props.user.username,
            "Password": this.props.user.password,
            "Address": this.sentenceToUpperCase(`${this.props.user.address.number} ${this.props.user.address.street}, ${this.props.user.address.city}.`),
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
                            return <ListGroup.Item key={key+value}>{key}: {value}</ListGroup.Item>
                        }) : 
                        <div className="spinner-div">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>}
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