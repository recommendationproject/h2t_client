//Dependencies
import React from 'react';
import map from 'lodash/map';
import  Item  from '../../../../../../components/Public/Item';
//Internals
import PRODUCTS from '../../../../Data';

const AllItems = () => (
  <div className="items">
    {map(PRODUCTS, (product)=> (
      <Item product={product} />
    ))}
  </div>
)

export default AllItems;
