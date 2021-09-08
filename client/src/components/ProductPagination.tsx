import { Component } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

class ProductPagination extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            maxPaginationItems:  window.innerWidth < 576 ? 1 : 3,
        }

        this.getPaginationItems = this.getPaginationItems.bind(this);
        this.getMaxPage = this.getMaxPage.bind(this);
    }

    // This function creates the buttons for pagination then filters based on the amount of pagination buttons desired 
    // E.g. if maxPaginationItems==3 show each page around the active page, if maxPaginationItems==1 only show the active page
    // It is long because of the edge cases. E.g. if the active page is 1 and the maxPaginationItems is 3, we want to show 1, 2, 3.
    getPaginationItems() {
        let paginationItems = [];
        let paginationsEitherSide = Math.floor(this.state.maxPaginationItems / 2);

        for (let i = 1; i <= Math.ceil(this.props.itemCount / this.props.itemsPerPage); i++) {
            paginationItems.push(
                <Button variant="outline-secondary" key={i} active={i === this.props.activePage} onClick={(_) => this.props.setActivePage(i)}>
                    {i}
                </Button>,
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
        const inputClass = this.state.maxPaginationItems !== 1 ? "input-wide-pagination" : "input-narrow-pagination";
        return (
            <InputGroup className={`${inputClass} page-buttons`}>
                <Button variant="outline-secondary" onClick={(_) => this.props.setActivePage(1)}><ChevronDoubleLeft /></Button>
                <Button variant="outline-secondary" onClick={(_) => this.props.setActivePage(Math.max(this.props.activePage - 1, 1))}><ChevronLeft /></Button>
                {this.getPaginationItems()}
                <Button variant="outline-secondary" onClick={(_) => this.props.setActivePage(Math.min(this.props.activePage + 1, this.getMaxPage()))}><ChevronRight /></Button>
                <Button variant="outline-secondary" onClick={(_) => this.props.setActivePage(this.getMaxPage())}><ChevronDoubleRight /></Button>
            </InputGroup>
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