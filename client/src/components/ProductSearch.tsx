

import { Component } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { ProductFilter } from '../redux/containers/product';
import { Search, XCircle, Funnel } from 'react-bootstrap-icons';

class ProductPagination extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchText: "",
            smallScreen: window.innerWidth < 576 ? true : false,
        }

        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.sentenceToUpperCase = this.sentenceToUpperCase.bind(this);
    }

    clearFilter() {
        this.setState({
            searchText: ""
        }, ()=> {
            this.props.setFilter(undefined);
        })
    }

    handleSearch() {
        this.props.setFilter({ ...this.props.productFilter, title: this.state.searchText })
    }

    handleDropdownClick(category: string) {
        this.props.setFilter({ ...this.props.productFilter, category })
    }

    sentenceToUpperCase = (sentence: string): string => {
        return sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    render() {
        const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
        const categoryFilter = this.props.productFilter?.category ? this.sentenceToUpperCase(this.props.productFilter.category) : "Category";
        
        // Need to change the width of the buttons as in the mobile version the text is not displayed, just the symbol
        const buttonClass = this.state.smallScreen === true ? "btn-narrow-search" : "btn-wide-search";

        return (
            <InputGroup className={buttonClass}>
                <DropdownButton
                    variant="outline-secondary"
                    title={<span><Funnel />{!this.state.smallScreen ? ` ${categoryFilter}` : null}</span>}
                    id="input-group-dropdown-1"
                    >
                    {categories.map((category) => {
                        return <Dropdown.Item active={categoryFilter === category} onClick={(_) => this.handleDropdownClick(category)} key={category}>{category}</Dropdown.Item>
                    })}
                </DropdownButton>
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={this.state.searchText}
                    onChange={(e: any) => this.setState({ searchText: e.target.value })}
                    onKeyPress={(e: any) => e.key === 'Enter' ? this.handleSearch() : null}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSearch}>
                    <Search />{!this.state.smallScreen ? " Search" : null}
                </Button>
                <Button variant="outline-danger" id="button-addon2" onClick={this.clearFilter}>
                    <XCircle />{!this.state.smallScreen ? " Clear" : null}
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
    smallScreen: boolean;
}

export default ProductPagination;