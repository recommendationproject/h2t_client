import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import {DeleteOutline} from '@material-ui/icons';
import { addProduct } from '../../actions';
import validate from 'validate.js';
import { imagesUpload } from '../../../../../utils/apis/apiAuth';
import async from 'async';
import { useToasts } from 'react-toast-notifications';
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
    presence: { allowEmpty: false, message: 'Tên sản phẩm không được để trống !' },
  },
  price: {
    presence: { allowEmpty: false, message: 'Số lượng không được để trống !' },
  },
};

const UsersToolbar = props => {
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
        price: '',
        description: '',
        category_id: 'category000000000002',
        img: []
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
    count: state.product.count
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
      price: '',
      description: '',
      category_id: 'category000000000002',
      img: []
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

  const store = useStore();
  const category = store.getState().adminInfo.category;

  const dispatch = useDispatch();

  const handleChangeFile = async file => {
    let imgArr = formState.values.img;
    async.forEachOf(file.target.files, async (value, key) => {
      let rs = await imagesUpload(value);
      imgArr.push(rs.data.data.link);

    }, async err => {
      if (err) console.log(err);
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          img: imgArr
        }
      }));
    });
  };
  const { addToast } = useToasts();
  const handleAccept = () => {
    if(formState.values.img.length ==0){
      addToast('Bạn cần thêm ảnh cho sản phẩm', { autoDismiss: true, appearance: 'error' })
    } else {
      console.log(formState.values.img);
      
      dispatch(addProduct(formState.values));
      setIsAdd(true);
    }
    
  };

  const handleDeleteImage = (img) => {
    let imgArr = formState.values.img;
    imgArr.find((e, i) => {
      if (e === img) {
        imgArr.splice(i, 1);
      }
    })
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        img: imgArr
      }
    }));
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
          THÊM SẢN PHẨM
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
                  label="Tên sản phẩm"
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
                  error={hasError('price')}
                  helperText={
                    hasError('price') ? formState.errors.price[0] : null
                  }
                  label="Giá"
                  margin="dense"
                  name="price"
                  onChange={handleChange}
                  type="number"
                  required
                  value={formState.values.price}
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
                  helperText=""
                  label="Mô tả"
                  margin="dense"
                  name="description"
                  onChange={handleChange}
                  value={formState.values.description}
                  variant="outlined"
                  multiline={true}
                  rows={4}
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Loại sản phẩm"
                  margin="dense"
                  name="category_id"
                  onChange={handleChange}
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={formState.values.category_id}
                  variant="outlined"
                >
                  {category.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name + ' - ' + option.gender}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  onChange={handleChangeFile}
                  type="file"
                  multiple
                // disabled={uploadEnable}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" color="primary" className={classes.uploadButton} >
                    Upload
                    </Button>
                </label>
                <div id='resultEdit' className={classes.resultEdit}>
                  {formState.values.img.map((track, i) => {
                    return (<div className={classes.imgItem} key={i}>
                      <Button style={{ minWidth: '0px', padding: '0px' }} onClick={() => handleDeleteImage(track)}><DeleteOutline fontSize={'small'} /></Button>
                      <img src={track} style={{ width: 70, height: 70, borderRadius: '50%' }} />
                    </div>)
                  })}
                </div>

              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Huỷ
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

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
