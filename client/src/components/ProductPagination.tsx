import { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class ProductPagination extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            // maxPaginationItems: window.innerWidth >= 576 ? window.innerWidth >= 768 ? window.innerWidth >= 992 ? 7 : 5 : 3 : 3,
            maxPaginationItems: 3,
        }

        this.getPaginationItems = this.getPaginationItems.bind(this);
        this.getMaxPage = this.getMaxPage.bind(this);
    }

    getPaginationItems() {
        let paginationItems = [];
        let paginationsEitherSide = Math.floor(this.state.maxPaginationItems / 2);

        for (let i = 1; i <= Math.ceil(this.props.itemCount / this.props.itemsPerPage); i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === this.props.activePage} onClick={(_) => this.props.setActivePage(i)}>
                    {i}
                </Pagination.Item>,
            )
        }

        if (paginationItems.length < this.state.maxPaginationItems) {
            return paginationItems;
        } else {
            let minPage = this.props.activePage - paginationsEitherSide;
            let maxPage = this.props.activePage + paginationsEitherSide;
            let overrun = maxPage - this.getMaxPage() + 1;
            let underrun = 1 - minPage;

            if (underrun > 0) {
                maxPage += underrun;
            } else if (overrun > 0) {
                minPage -= overrun;
            } else {
                minPage -= 1;
            }

            return paginationItems.slice(Math.max(minPage, 0), Math.min(maxPage, this.getMaxPage() + 1));
        }
    }

    getMaxPage(): number {
        return Math.ceil(this.props.itemCount / this.props.itemsPerPage);
    }

    render() {
        return (
            <Pagination>
                <Pagination.First onClick={(_) => this.props.setActivePage(1)} />
                <Pagination.Prev onClick={(_) => this.props.setActivePage(Math.max(this.props.activePage - 1, 1))} />
                {this.getPaginationItems()}
                <Pagination.Next onClick={(_) => this.props.setActivePage(Math.min(this.props.activePage + 1, this.getMaxPage()))}/>
                <Pagination.Last onClick={(_) => this.props.setActivePage(this.getMaxPage())}/>
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

interface State {
    maxPaginationItems: number;
}

export default ProductPagination;