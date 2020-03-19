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
import callApiUnauth, { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import { useStore } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
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


const OrdersTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Mã đơn hàng', field: 'id' },
    { title: 'Mã khách hàng', field: 'customer_id' },
    { title: 'Tên khách hàng', field: 'name' },
    { title: 'Trạng thái', field: 'status' },
    {
      title: '', field: 'order_id', render: rowData => {

        if (rowData.israting === 0 && rowData.status === 5) {
          return (<Button variant="outlined" color="primary" onClick={() => handleEdit(rowData, rowData.israting)}>Đánh giá</Button>)
        }
      }
    },
  ];
  const store = useStore().getState().userInfo;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async (store) => {
      const result = await callApiUnauthWithHeader(`order/byuser`, 'GET', { id: store.token.user.id })
      setData(result.data);
    };
    fetchData(store);
  }, [store]);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const handleDelete = (rowData) => {

  }
  const [values, setValues] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isRating, setIsRating] = useState(true);
  const [open, setOpen] = useState(false);
  const handleEdit = async (rowData, israting) => {
    setOpen(true);
    setIsLoadingDetail(true);
    const result = await callApiUnauthWithHeader(`order/detailbyuser`, 'GET', { id: rowData.id });
    setValues(result.data);
    setIsRating(israting === 0 ? false : true)
    setIsLoadingDetail(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveRating = async () => {
    let rs = values.map((v) => ({ order_id: v.order_id, odid: v.odid, rating: v.rating }))
    await callApiUnauth(`order/rating`, 'POST', { value: rs });
    let datas = [];
    datas = datas.concat(data);
    datas.find(item => {
      if (item.id === values[0].order_id) {
        item.israting = 1;
      }
    })
    setData(datas);
    setOpen(false);
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
                  onClick: (event, rowData) => handleEdit(rowData, 1)
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
                          { title: 'Số lượng', field: 'amount' },
                          {
                            title: 'Đánh giá', field: 'images', render: rowData => {
                              return (
                                <div>
                                  <Rating
                                    name={"hover-feedback" + rowData.tableData.id}
                                    value={rowData.rating}
                                    id='rate1'
                                    readOnly={isRating}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                      let oldValue = [];
                                      oldValue = oldValue.concat(values);
                                      oldValue[event.target.name.replace("hover-feedback", "")].rating = newValue;
                                      setValues(oldValue);
                                    }}
                                  />
                                </div>
                              )
                            }
                          }
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
                {(isRating ? (<div></div>) : (
                  <Button autoFocus onClick={handleSaveRating} color="primary">
                    Xác nhận
                  </Button>))}
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

export default OrdersTable;
