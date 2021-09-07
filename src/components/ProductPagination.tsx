import { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class ProductPagination extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.getPaginationItems = this.getPaginationItems.bind(this);
    }

    getPaginationItems() {
        let paginationItems = [];

        for (let i = 1; i <= this.props.itemCount / this.props.itemsPerPage; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === this.props.activePage} onClick={(_) => this.props.setActivePage(i)}>
                    {i}
                </Pagination.Item>,
            )
        }

        return paginationItems;
    }

    render() {
        return (
            <Pagination>
                <Pagination.First onClick={(_) => this.props.setActivePage(1)} />
                <Pagination.Prev onClick={(_) => this.props.setActivePage(Math.max(this.props.activePage - 1, 1))} />
                {this.getPaginationItems()}
                <Pagination.Next onClick={(_) => this.props.setActivePage(Math.min(this.props.activePage + 1, this.props.itemCount / this.props.itemsPerPage))}/>
                <Pagination.Last onClick={(_) => this.props.setActivePage(this.props.itemCount / this.props.itemsPerPage)}/>
            </Pagination>
        )
    }
}

interface Props {
    itemCount: number;
    itemsPerPage: number;
    activePage: number;
    setActivePage: (activePage: number) => void;
}

interface State {}

export default ProductPagination;