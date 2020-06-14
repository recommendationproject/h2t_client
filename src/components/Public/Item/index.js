//Dependencies
import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import './index.css';
import { useStore } from 'react-redux';
import callApiUnauth from '../../../utils/apis/apiUnAuth';
import { Button } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
var CurrencyFormat = require('react-currency-format');
const Item = (props) => {
  const store = useStore();
  const { addToast } = useToasts();
  const addToCart = async () => {
    if (store.getState().userInfo) {
      await callApiUnauth(`addCart`, 'POST', { product_id: props.product.id, customer_id: store.getState().userInfo.token.user.id, amount: 1, size:'S', color:'white' });
      addToast('Thêm thành công', { autoDismiss: true, appearance: 'success' })
    } else {
      let arrItemCart = [];
      if ('itemCart' in localStorage) {
        arrItemCart = JSON.parse(localStorage.getItem('itemCart'));
      }

      let checkExist = null;
      arrItemCart.forEach((e, i) => {
        if (e.id === props.product.id && e.size=== 'S' && e.color === 'white')
          checkExist = i
      });

      if (checkExist !== null)
        arrItemCart[checkExist].amount = parseInt(arrItemCart[checkExist].amount) + 1;
      else
        arrItemCart.push({ id: props.product.id, name: props.product.name, price: props.product.price, amount: 1, images: props.product.images, size:'S', color:'white' });
      localStorage.setItem('itemCart', JSON.stringify(arrItemCart));
      addToast('Thêm thành công', { autoDismiss: true, appearance: 'success' })
    }
  }
  return (
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
        <h5 id="product-price" style={{width: '100%'}}>
          <CurrencyFormat value={props.product.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value => <div style={{ color: 'red', float: 'left' }}>{value}</div>} />
          <CurrencyFormat value={props.product.discountprice} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value => <div style={{ color: 'rgba(0,0,0,0.4)', textDecoration:'line-through', marginLeft:'5px', float:'left'}}>{value}</div>} />
        </h5>
        {/* <AddShoppingCartIcon  className="addcart-icon" onClick={addToCart}/> */}
        <Button style={{ display: 'flex', minWidth:'40px' }} onClick={addToCart}><AddShoppingCartIcon className="addcart-icon" /></Button>
      </div>
    </div>
  )
}

export default Item;
