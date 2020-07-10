import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, deleteProduct, updateProduct } from '../../actions';
import validate from 'validate.js';
import { imagesUpload } from '../../../../../utils/apis/apiAuth';
import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import async from 'async';
import { useToasts } from 'react-toast-notifications';
import CKEditor from 'ckeditor4-react';

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
  imgItem: {
    display: 'inline-block',
    position: 'relative',
    margin: '2px'
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

const UsersTable = () => {
  const classes = useStyles();
  const store = useSelector(state => state).adminInfo.token.user.groupid;
  const columns = [
    { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'name' },
    { title: 'Giá', field: 'price' },
    { title: 'Số lượng', field: 'amount' },
    { title: 'Loại', field: 'cate_name' },
    { title: 'Gtới tính', field: 'gender' },
  ];
  const { data, msg, type, count } = useSelector(state => ({
    data: state.product.lst,
    msg: state.product.msg,
    type: state.product.type,
    count: state.product.count,
  }));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdating] = React.useState(false);

  const firstUpdate = useRef(true);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [data]);

  const { addToast } = useToasts();
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (type === 'success' && type !== null) {
      addToast(msg, { autoDismiss: true, appearance: type })
    } else if (type !== 'success' && type !== '') {
      addToast(msg, { autoDismiss: true, appearance: type })
    }
    setIsUpdating(false)
    // eslint-disable-next-line
  }, [msg, type, count]);

  const handleDelete = (rowData) => {
    dispatch(deleteProduct(rowData.id));
  }

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

  const [open, setOpen] = useState(false);
  const handleEdit = async (data) => {
    const listImage = await callApiUnauthWithHeader(`product/img`, 'GET', { id: data.id })
    let imgArr = listImage.data.map((value, key) => value.images);
    setFormState(formState => ({
      ...formState,
      values: {
        ...data,
        img: imgArr
      }
    }));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleAccept = () => {
    dispatch(updateProduct(formState.values));
    setIsUpdating(true)
  };

  const onEditorChange = (evt) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        detaildescription: evt.editor.getData()
      }
    }));
  }

  const handleDeleteImage = (img) => {
    let imgArr = formState.values.img;
    // eslint-disable-next-line
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

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <div>
            {store !== 'saler' ? (
              <MaterialTable title="Sản Phẩm" columns={columns} data={data} icons={tableIcons}

                actions={[

                  {
                    icon: Edit,
                    tooltip: 'Sửa',
                    onClick: (event, rowData) => handleEdit(rowData)
                  },
                  {
                    icon: DeleteOutline,
                    tooltip: 'Xóa',
                    onClick: (event, rowData) => handleDelete(rowData)
                  }
                ]}
                options={{
                  actionsColumnIndex: -1,
                  exportButton: true
                }}
              />
            ) : (
                <MaterialTable title="Sản Phẩm" columns={columns} data={data} icons={tableIcons}
                  options={{
                    actionsColumnIndex: -1,
                    exportButton: true
                  }}
                />
              )}


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
                      required
                      value={formState.values.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <h3>Mô tả chi tiết</h3>
                    <CKEditor
                      data={formState.values.detaildescription}
                      onChange={onEditorChange}
                    />
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
                          <img src={track} alt='z' style={{ width: 70, height: 70, borderRadius: '50%' }} />
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
                <Button onClick={handleAccept} color="primary" autoFocus disabled={!formState.isValid || isUpdate}>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
          </div>

        )}
    </div>
  );
};

export default UsersTable;
