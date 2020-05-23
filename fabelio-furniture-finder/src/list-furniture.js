import React, { Component } from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import './global.scss';

class Furnitures extends Component {
    constructor(props){
        super(props);

        this.state = {
            post: [],
            allPosts: [],
            selectedOption: null
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    onKeyUp = e => {
        let allPosts = this.state.allPosts.products
        const post = allPosts.filter(item =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        let postItem = this.state.post.products
        postItem.products = post
        this.setState({ post : postItem });
    };

    componentDidMount() {
        fetch('http://www.mocky.io/v2/5c9105cb330000112b649af8')
            .then(response => response.json())
            .then( data => {
                    this.setState({
                        post: data,
                        allPosts: data,
                        postFilter: data // array data from JSON stored in these
                    });
                }
            )            
	}

    render() {
        console.log('dataa',this.state.post)
        let post = this.state.post.products
        let postFilter = this.state.post.furniture_styles
        console.log('postFilter', postFilter)

        const categories = [
            { value: 'classic', label: 'Classic' },
            { value: 'midcentury', label: 'Midcentury' },
            { value: 'scandinavian', label: 'Scandinavian' },
            { value: 'modern', label: 'Modern' },
            { value: 'contemporary', label: 'Contemporary' }
        ];

        return (
            <div className="container">
                    <div className="top-contents search-outer">
                        <form
                            role="search"
                            method="get"
                            id="searchform"
                            className="searchform"
                            action=""
                        >
                            <input
                                type="search"
                                onChange={this.onKeyUp}
                                name="s"
                                id="s"
                                placeholder="Search Furniture"
                            />
                        </form>
                        <div className="filter-option">
                            <div className="option-select"><ReactMultiSelectCheckboxes options={categories} /></div>
                            <div className="option-select" style={{marginLeft: '10px'}}>
                                <select id="select">
                                    {
                                        post !== undefined ?
                                            post.map( delivery => {
                                                return <option value={delivery.delivery_time}>{delivery.delivery_time}</option>
                                            })
                                        : null
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="contents">
                        <ul className="data-list">
                            {
                                post !== undefined ? 
                                    post.map((item, index) => {
                                        return <li className={"box-item " + index} key={item.name}>
                                            <div className="box-item_head">
                                                <span>{item.name}</span><span>{item.price}</span>
                                            </div>
                                            <p className="line-clamp">{item.description}</p>
                                            <p className="item-category">{item.furniture_style.join()}</p>
                                            <div className="item-delivery">Delivery in {item.delivery_time} Days</div>
                                        </li>
                                    })
                                : null
                            }
                        </ul>
                    </div>
            </div>
        )
    }
}

export default Furnitures;