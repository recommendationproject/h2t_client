import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  // ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
// import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestProducts = props => {
  const { rsTopCustomer } = props;

  const classes = useStyles();

  const [products] = useState(rsTopCustomer);

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Khách mua nhiều nhất"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.SourceOfItemsID}
            >
              {/* <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.ItemImage}
                />
              </ListItemAvatar> */}
              <ListItemText
                primary={product.name}
                secondary={` ${product.count} đơn hàng`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
