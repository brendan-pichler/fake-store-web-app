

import { Component } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { ProductFilter } from '../redux/ducks/product';

class ProductPagination extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchText: "",
        }

        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    clearFilter() {
        this.props.setFilter(undefined);
    }

    handleSearch() {
        this.props.setFilter({ ...this.props.productFilter, title: this.state.searchText })
    }

    handleDropdownClick(category: string) {
        this.props.setFilter({ ...this.props.productFilter, category })
    }

    render() {
        const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
        const categoryFilter = this.props.productFilter?.category ? this.props.productFilter.category : "Select Category";

        return (
            <InputGroup>
                <DropdownButton
                    variant="outline-secondary"
                    title={categoryFilter.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    id="input-group-dropdown-1"
                    >
                    {categories.map((category) => {
                        return <Dropdown.Item active={categoryFilter === category} onClick={(_) => this.handleDropdownClick(category)} key={category}>{category}</Dropdown.Item>
                    })}
                </DropdownButton>
                <FormControl
                    placeholder="Product Search"
                    aria-label="Product Search"
                    aria-describedby="basic-addon2"
                    onChange={(e) => this.setState({ searchText: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? this.handleSearch() : null}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSearch}>
                    Search
                </Button>
                <Button variant="outline-danger" id="button-addon2" onClick={this.clearFilter}>
                    Clear Filter
                </Button>
            </InputGroup>
        )
    }
}

interface Props {
    setFilter: (productFilter: ProductFilter) => void;
    productFilter: ProductFilter;
}

interface State {
    searchText: string;
}

export default ProductPagination;