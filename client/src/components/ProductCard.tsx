import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../redux/containers/product';

class ProductCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            pageNumber: 1
        }
        
        this.displayPrice = this.displayPrice.bind(this);
    }

    // This function rounds and then displays the correct amount of decimal points for a price
    displayPrice(price: number) {
        return `$${(+price.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    render() {
        return (
            <Card className="ProductCard">
                <Card.Header>{this.props.product.category}</Card.Header>
                <Card.Img variant="top" src={this.props.product.image} />
                <Card.Body>
                    <Card.Title>{this.props.product.title}</Card.Title>
                    <Card.Text>{this.props.product.description}</Card.Text>
                    <Card.Title>{this.displayPrice(this.props.product.price)}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Button className="btn-add-to-cart" variant="primary">Add to Cart</Button>
                </Card.Footer>
            </Card>
        )
    }
}

interface Props {
    product: Product;
}

interface State {}

export default ProductCard;