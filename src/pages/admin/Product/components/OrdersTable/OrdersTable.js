import React, { useEffect, useState, forwardRef } from 'react';
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
  Visibility
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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

const UsersTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Mã đơn hàng', field: 'id' },
    { title: 'Mã khách hàng', field: 'customer_id' },
    { title: 'Tên khách hàng', field: 'name' },
    { title: 'Trạng thái', field: 'status' },
    {
      title: '', field: 'order_id', render: rowData => {
        let content = null;

        switch (rowData.status_id) {
          case 2:
            content = 'Duyệt đơn'
            break;
          case 3:
            content = 'Giao hàng'
            break;
          case 4:
            content = 'Thành công'
            break;
          default:
            break;
        }
        if (2 <= rowData.status_id && rowData.status_id <= 4) {
          return (<Button variant="outlined" color="primary" onClick={() => handleStatus(rowData.id, rowData.status_id)}>{content}</Button>)
        }
      }
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`order`, 'GET')
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const handleDelete = (rowData) => {

  }
  const [values, setValues] = useState([]);

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [open, setOpen] = useState(false);
  const handleEdit = async (rowData) => {
    setOpen(true);
    setIsLoadingDetail(true);
    const result = await callApiUnauthWithHeader(`order/detail`, 'GET', { id: rowData.id });
    setValues(result.data);
    setIsLoadingDetail(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatus = async (order_id, status) => {
    let datas = [];
    datas = datas.concat(data)
    datas.find(item => {
      if (item.id === order_id) {
        item.status_id++;
        switch (item.status_id) {
          case 3:
            item.status = 'Đã xác nhận'
            break;
          case 4:
            item.status = 'Đang giao'
            break;
          case 5:
            item.status = 'Giao hàng thành công'
            break;
          default:
            break;
        }
      }
    })    
    status++;
    await callApiUnauthWithHeader(`order/status`, 'POST', { id: order_id, status: status });
    setData(datas)
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
                  icon: Visibility,
                  tooltip: 'Chi tiết',
                  onClick: (event, rowData) => handleEdit(rowData)
                },
                {
                  icon: DeleteOutline,
                  tooltip: 'Hủy',
                  onClick: (event, rowData) => handleDelete(rowData)
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true
              }}
              localization={{ header: { actions: '' } }}
            />

            <Dialog
              fullWidth={true}
              maxWidth={'md'}
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
                    {isLoadingDetail ? (
                      <div>Loading ...</div>
                    ) : (
                        <MaterialTable title="Đơn hàng" columns={[
                          { title: 'Mã', field: 'id' },
                          { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, borderRadius: '50%' }} /> },
                          { title: 'Tên sản phẩm', field: 'name' },
                          { title: 'Giá', field: 'price' },
                          { title: 'Số lượng', field: 'amount' }
                        ]} data={values} icons={tableIcons}
                          options={{
                            search: false,
                            paging: false
                          }} />
                      )}
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Đóng
          </Button>
              </DialogActions>
            </Dialog>
          </div>

        )}
    </div>
  );
};

export default UsersTable;
