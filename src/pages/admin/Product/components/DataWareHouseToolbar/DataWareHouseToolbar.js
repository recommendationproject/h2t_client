import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { addWh } from '../DataWareHouseTable/actions';
import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
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
  amount: {
    presence: { allowEmpty: false, message: 'Số lượng không được để trống !' },
  },
};

const DataWareHouseToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const firstUpdate = useRef(true);

  const [open, setOpen] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const [supply, setSupply] = React.useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      product : '',
      amount: '',
      supply: '',
    },
    touched: {},
    errors: {}
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resultProduct = await callApiUnauthWithHeader(`product/admin`, 'GET', {})
      const resultSupply = await callApiUnauthWithHeader(`supply`, 'GET', {})
      setSupply(resultSupply.data);
      setProduct(resultProduct.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    
    if (product.length > 0 && supply.length > 0) {      
      setFormState(formState => ({
        ...formState,
          values: {
           ...formState.values,
           product: product[0].id,
           supply: supply[0].id
          }
        }))
      setIsLoading(false);
    }
  }, [product, supply]);

  const handleClose = () => {
    setOpen(false);
  };

  const { count } = useSelector(state => ({
    count: state.wh.count
  }));

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsAdd(false);
  }, [count])



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
    dispatch(addWh(formState.values));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {isLoading ? (
        <React.Fragment></React.Fragment>
      ) : (
          <div className={classes.row}>
            <span className={classes.spacer} />
            {/* <Button className={classes.importButton}>Import</Button> */}
            {/* <Button className={classes.exportButton}>Export</Button> */}
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Nhập kho
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
                      label="Tên sản phẩm"
                      margin="dense"
                      name="product"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={formState.values.product}
                      variant="outlined"
                    >
                      {product.map(option => (
                        <option
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Nhà cung cấp"
                      margin="dense"
                      name="supply"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={formState.values.supply}
                      variant="outlined"
                    >
                      {supply.map(option => (
                        <option
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      error={hasError('amount')}
                      helperText={
                        hasError('amount') ? formState.errors.amount[0] : null
                      }
                      label="Số lượng"
                      margin="dense"
                      name="amount"
                      onChange={handleChange}
                      required
                      type="number"
                      value={formState.values.amount}
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
        )}
    </div>
  );
};

DataWareHouseToolbar.propTypes = {
  className: PropTypes.string
};

export default DataWareHouseToolbar;
