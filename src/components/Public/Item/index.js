//Dependencies
import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import './index.css';
const Item = (props) => (
      <div key={props.product.id} className="item">
        <Link to={`/products/${props.product.id}`}>
        <div className="product-img">
          <img alt={props.product.name} src={props.product.images} />
        </div>
        <div className="product-details">
          <h1 id="product-name">{props.product.name}</h1>
          <h4 id="product-description">{props.product.name}</h4>
        </div>
        </Link>
        <div className="price-add">
          <h5 id="product-price">${props.product.price}</h5>
          <AddShoppingCartIcon />
        </div>
      </div>
)

export default Item;
