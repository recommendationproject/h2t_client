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
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { fetchSupply, deleteSupply, updateSupply } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
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
    presence: { allowEmpty: false, message: 'Tên nhà cung cấp không được để trống !' },
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

const SupplyTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Tên nhà cung cấp', field: 'name' },
    { title: 'Địa chỉ', field: 'address' },
    { title: 'Số dt', field: 'phone' },
    { title: 'Email', field: 'email' },
  ];
  const { addToast } = useToasts();
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchSupply());
  }, [dispatch]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      id:'',
      name:'',
      address:'',
      email:'',
      phone:''
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
    data: state.supply.lst,
    msg: state.supply.msg,
    type: state.supply.type,
    count: state.supply.count
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
        ...data
      },
    }));
    setOpen(true);
  }

  const handleClose = () => {
    setFormState(formState => ({
      isValid: false,
      values: {
        id:'',
        name:'',
        address:'',
        email:'',
        phone:''
      },
      touched: {},
      errors: {}
    }));
    setOpen(false);  
  };

  const handleAccept = () => {    
     dispatch(updateSupply(formState.values));
     setIsUpdate(true);
  };

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;

  const handleDelete = (data) => {
    if(data.amount == null){
      dispatch(deleteSupply(data.id));
    } else {
      addToast('Nhà cung cấp đã phát sinh hàng hóa, không thể xóa !', { autoDismiss: true, appearance: 'error' })
    }
  }

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
                exportButton: false
              }}
            />

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

export default SupplyTable;
