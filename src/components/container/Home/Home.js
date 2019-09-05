import React, { Component } from 'react';
import ProductCard from '../../presentational/ProductCard/ProductCard';
import Loader from '../../presentational/Loader/Loader';
import './Home.css';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/api/products')
    .then(res => {
      console.log('res.data products:', res.data);
      this.setState({
        products: res.data, 
        loading: false
      });
    }).catch(err => 
      console.log("Could not fetch products during mount", err)
    );
  }

  
  render() {
    const { products, loading } = this.state;
    if(!loading) {
      return (
        <div className='home container'>
          <div className='home-products container'>
            { products.length 
              ? products.map(product => 
                <ProductCard key={product.id} {...product} />
              ) 
              : null 
            }
          </div>
        </div>
      );
    } else {
      return <Loader />
    }

  }
}