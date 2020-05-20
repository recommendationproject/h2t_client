//Dependencies
import React, { useEffect } from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import './index.css';
import { useStore } from 'react-redux';
import callApiUnauth from '../../../utils/apis/apiUnAuth';
import {Button} from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
var CurrencyFormat = require('react-currency-format');
const ItemRecommend = (props) => {
  const store = useStore();
  const { addToast } = useToasts();
  const addToCart = async () => {
    if(store.getState().userInfo){
      await callApiUnauth(`addCart`, 'POST', {product_id:props.product.id, customer_id: store.getState().userInfo.token.user.id, amount : 1});
      addToast('Thêm thành công', { autoDismiss: true, appearance: 'success' })
    }else{
      addToast('Bạn cần đăng nhập để thêm vào giỏ hàng', { autoDismiss: true, appearance: 'success' })
    }
  }
  return (
    <div key={props.product.id} className="item-recommend">
      <Link to={`/products/${props.product.id}`}>
      <div className="product-img">
        <img alt={props.product.name} src={props.product.images} className="img-recommend"/>
      </div>
      <div className="product-details">
        {/* <h1 id="product-name">{props.product.name}</h1> */}
        <h4 id="product-description" style={{textAlign: 'center'}}>{props.product.name}</h4>
      </div>
      </Link>
      <div className="price-add">
        <h5 id="product-price"><CurrencyFormat value={props.product.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value => <div style={{color: 'red'}}>{value}</div>} /></h5>
        {/* <AddShoppingCartIcon  className="addcart-icon" onClick={addToCart}/> */}
     <Button style={{display:'flex'}} onClick={addToCart}><AddShoppingCartIcon className="addcart-icon" /></Button>
      </div>
    </div>
)
}

export default ItemRecommend;