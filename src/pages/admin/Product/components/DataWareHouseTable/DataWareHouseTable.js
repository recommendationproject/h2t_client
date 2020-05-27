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
  ViewColumn,
  Done,
  HighlightOff,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip } from '@material-ui/core';
import { fetchWh, deleteWh, updateWh } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import validate from 'validate.js';
import moment from 'moment';
import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';

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

const DataWareHouseTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Tên sản phẩm', field: 'productname' },
    { title: 'Tên nhà cung cấp', field: 'suppname' },
    { title: 'Số lượng', field: 'amount' },
    { title: 'Ngày nhập kho', field: 'date_import', render: rowData => moment(rowData.date_import).format('DD-MM-YYYY') },
    { title: 'Trạng thái', field: 'status' },
    {
      title: '', field: 'StatusID', render: rowData => {


        return (<React.Fragment>
          {rowData.sttid === 2 ? (
            <React.Fragment>
              <Tooltip title="Sửa">
                <Button variant="outlined" color="primary" onClick={() => handleEdit(rowData)} style={{ marginLeft: '10px' }}><Edit /></Button>
              </Tooltip>
              <Tooltip title="Xóa">
                <Button variant="outlined" onClick={() => handleReject(rowData)} style={{ marginLeft: '10px', color: '#f44336', border: '#f44336 1px solid' }}><HighlightOff /></Button>
              </Tooltip>
              <Tooltip title="Duyệt">
                <Button variant="outlined" color="primary" onClick={() => handleAcpt(rowData)} style={{ marginLeft: '10px' }}><Done /></Button>
              </Tooltip>
            </React.Fragment>
          ) : (
              <React.Fragment>
              </React.Fragment>
            )}
        </React.Fragment>)

      }, filtering: false
    },
  ];

  const handleReject = (data) => {
    dispatch(deleteWh(data.id));
  }

  const { addToast } = useToasts();
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [product, setProduct] = React.useState({});
  const [supply, setSupply] = React.useState({});
  const [open, setOpen] = useState(false);

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
      setIsLoadingUpdate(false);
    }
  }, [product, supply]);

  useEffect(() => {
    dispatch(fetchWh());
  }, [dispatch]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      product: '',
      amount: '',
      supply: '',
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

  const { data, msg, type, count } = useSelector(state => ({
    data: state.wh.lst,
    msg: state.wh.msg,
    type: state.wh.type,
    count: state.wh.count
  }));

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [data]);

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
    setIsUpdate(false)
    // eslint-disable-next-line
  }, [msg, type, count]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? (event.target.checked ? 1 : 0)
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleEdit = (data) => {    
    setFormState(formState => ({
      ...formState,
      values: {
        ...data,
        supply: data.supp_id,
        product: data.product_id
      },
    }));
    setOpen(true);
  }

  const handleClose = () => {
    setFormState({
      isValid: false,
      values: {
        product: '',
        amount: '',
        supply: '',
      },
      touched: {},
      errors: {}
    });
    setOpen(false);
  };

  const handleAccept = () => {
    dispatch(updateWh(formState.values));
    setIsUpdate(true);
  };

  const handleAcpt = (data) => {
    dispatch(updateWh({id:data.id, product: data.product_id, supply: data.supp_id, amount: data.amount, sttid: 10}));
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
            <MaterialTable title="Đơn hàng" columns={columns} data={data} icons={tableIcons}
              options={{
                exportButton: false
              }}
            />
            {isLoadingUpdate ? (
              <React.Fragment></React.Fragment>
            ) : (
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
                    <Button onClick={handleAccept} color="primary" autoFocus disabled={!formState.isValid || isUpdate}>
                      Xác nhận
          </Button>
                  </DialogActions>
                </Dialog>
              )}
          </div>

        )}
    </div>
  );
};

export default DataWareHouseTable;
