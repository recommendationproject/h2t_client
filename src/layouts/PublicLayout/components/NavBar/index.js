// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Menu, MenuItem, Button, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// Internals
import './index.css';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Navbar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
    <div className="nav-links">
      <ul>
        <li><NavLink activeClassName="selected" className="nav-link" exact to="/">Trang chủ </NavLink></li>
        <li>
          {/* <NavLink activeClassName="selected" className="nav-link" to="/women">Nam</NavLink> */}
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Nam
      </Button>
        </li>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
        <li><NavLink activeClassName="selected" className="nav-link" to="/men">Nữ</NavLink></li>
      </ul>
    </div>
    <div className="shopping-cart">
      <NavLink to="/cart" style={{ color: 'white' }}><ShoppingCartIcon /></NavLink>
    </div>
  </nav>
  )
  //    <nav role='menu'>
  //    <input id='link-top' type='checkbox' />
  //    <p class='down' id='menu'>Menu</p>
  //    <ul id='nav'>
  //      <li role='none'>
  //        <input id='link-shop' />
  //        <label class='right' id='shop'>Shop</label>
  //        <ul id='nest'>
  //        </ul>
  //      </li>

  //    </ul>
  //  </nav>
  };

export default Navbar;
