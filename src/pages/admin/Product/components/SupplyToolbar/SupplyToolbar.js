import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { addSupply } from '../SupplyTable/actions';
import validate from 'validate.js';
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  dialogContent: {
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'Tên đối tác không được để trống !' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'Email không được để trống !' },
    email: true
  },
  phone: {
    presence: { allowEmpty: false, message: 'Số điện thoại không được để trống !' },
    length: {
      minimum: 10,
      maximum: 11,
      message: 'Số dt không hợp lệ!'
    }
  },
};

const SupplyToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
   const firstUpdate = useRef(true);

  const [open, setOpen] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: 'name',
      address: '',
      phone: '',
      email: '',
    },
    touched: {},
    errors: {}
  });

  const handleClickOpen = () => {
    setFormState({
      isValid: false,
      values: {
        name: 'name',
        address: '',
        phone: '',
        email: '',
      },
      touched: {},
      errors: {}
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { count } = useSelector(state => ({
    count: state.supply.count
  }));

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsAdd(false);
  },[count])

  

  useEffect(() => {
    const errors = validate(formState.values, schema, { fullMessages: false });
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const dispatch = useDispatch();

  const handleAccept = () => {    
    setIsAdd(true);
     dispatch(addSupply(formState.values));
  };

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button> */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Thêm nhà cung cấp
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          scroll={'body'}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Thông tin nhà cung cấp"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  error={hasError('name')}
                  helperText={
                    hasError('name') ? formState.errors.name[0] : null
                  }
                  label="Tên nhà cung cấp"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
                  required
                  value={formState.values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  margin="dense"
                  name="address"
                  onChange={handleChange}
                  value={formState.values.address}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  error={hasError('phone')}
                  helperText={
                    hasError('phone') ? formState.errors.phone[0] : null
                  }
                  label="Số điện thoại"
                  margin="dense"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  required
                  value={formState.values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  error={hasError('email')}
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={formState.values.email}
                  variant="outlined"
                  multiline={true}
                  rows={4}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Đóng
          </Button>
            <Button onClick={handleAccept} color="primary" autoFocus disabled={!formState.isValid || isAdd}>
              Xác nhận
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

SupplyToolbar.propTypes = {
  className: PropTypes.string
};

export default SupplyToolbar;
