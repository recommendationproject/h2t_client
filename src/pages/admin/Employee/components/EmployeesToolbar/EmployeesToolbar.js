import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { addEmployee } from '../../actions';
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
  },
  resultEdit: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    whiteSpace: 'nowrap'
  },
  imgItem:{
    display:'inline-block',
    position:'relative',
    margin:'2px'
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'Tên không được để trống !' },
  },
  phone: {
    presence: { allowEmpty: false, message: 'Số điện thoại không được để trống !' },
    length: {
      minimum: 10,
      maximum: 11,
      message: 'Số dt không hợp lệ!'
    }
  },
  username: {
    presence: { allowEmpty: false, message: 'Tên đăng nhập không được để trống !' },
  },
  pass: {
    presence: { allowEmpty: false, message: 'Mật khẩu không được để trống !' },
  },
};

const EmployeesToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const firstUpdate = useRef(true);
  const firstUpdate = useRef(true);
  const [open, setOpen] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);

  const handleClickOpen = () => {
    setFormState({
      isValid: false,
      values: {
        name: '',
        address: '',
        phone: '',
        username: '',
        pass: ''
      },
      touched: {},
      errors: {}
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { count } = useSelector(state => ({
    count: state.employee.count
  }));

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsAdd(false);
  }, [count])


  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      address: '',
      phone: '',
      username: '',
      pass: ''
    },
    touched: {},
    errors: {}
  });

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
      dispatch(addEmployee(formState.values));
      setIsAdd(true);
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
          THÊM NHÂN VIÊN
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          scroll={'body'}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Thông tin sản phẩm"}</DialogTitle>
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
                  label="Tên nhân viên"
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
                  required
                  label="Số điện thoại"
                  margin="dense"
                  name="phone"
                  onChange={handleChange}
                  value={formState.values.phone}
                  variant="outlined"
                  type='number'
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
               <TextField
                  fullWidth
                  error={hasError('username')}
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  required
                  label="Tên đăng nhập"
                  margin="dense"
                  name="username"
                  onChange={handleChange}
                  value={formState.values.username}
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
                  error={hasError('pass')}
                  helperText={
                    hasError('pass') ? formState.errors.pass[0] : null
                  }
                  type='password'
                  required
                  label="Mật khẩu"
                  margin="dense"
                  name="pass"
                  onChange={handleChange}
                  value={formState.values.pass}
                  variant="outlined"
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

EmployeesToolbar.propTypes = {
  className: PropTypes.string
};

export default EmployeesToolbar;
