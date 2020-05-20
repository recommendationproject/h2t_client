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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployee, deleteEmployee, updateEmployee } from '../../actions';
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
  }
};

const EmployeesTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Tên', field: 'name' },
    { title: 'Địa chỉ', field: 'address' },
    { title: 'Số điện thoại', field: 'phone' },
    { title: 'tên đăng nhập', field: 'username' },
    {
      title: '', field: 'status', render: rowData => {
        return (<Switch
          checked={rowData.status == 1 ? true : false}
          onChange={() => handleChangeStatus(rowData)}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />)

      }
    },
  ];



  const { data, msg, type, count } = useSelector(state => ({
    data: state.employee.lst,
    msg: state.employee.msg,
    type: state.employee.type,
    count: state.employee.count,
  }));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdating] = React.useState(false);
  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  const firstUpdate = useRef(true);

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
  }, [msg, type, count]);

  const handleDelete = (rowData) => {
    dispatch(deleteEmployee(rowData.id));
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      id: '',
      name: '',
      address: '',
      phone: '',
      username: '',
      pass: '',
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

  const handleChangeStatus = rowdata => {
    dispatch(deleteEmployee({ employeeid: rowdata.id, status: rowdata.status === 1 ? 0 : 1 }));
  };
  const [open, setOpen] = useState(false);
  const handleEdit = async (data) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...data,
        pass: ''
      }
    }));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    dispatch(updateEmployee(formState.values));
    setIsUpdating(true)
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
            <MaterialTable title="Nhân viên" columns={columns} data={data} icons={tableIcons}
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Sửa',
                  onClick: (event, rowData) => handleEdit(rowData)
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true
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
                      type='password'
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
                <Button onClick={handleAccept} color="primary" autoFocus disabled={!formState.isValid}>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
          </div>

        )}
    </div>
  );
};

export default EmployeesTable;
