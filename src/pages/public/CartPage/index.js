import React, { useState, forwardRef, useEffect, useRef } from 'react';
import './main.css';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import PaymentIcon from '@material-ui/icons/Payment';
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
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import { useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const CartPage = () => {
    const classes = useStyles();
    const columns = [
        { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />, editable: 'never' },
        { title: 'Tên sản phẩm', field: 'name', editable: 'never' },
        { title: 'Giá', field: 'price', editable: 'never' },
        { title: 'Số lượng', field: 'amount', type: 'numeric' },
    ];
    const [data, setData] = useState([]);
    const [dataAmount, setDataAmount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const firstUpdate = useRef(true);
    const store = useStore();
    const { addToast } = useToasts();
    useEffect(() => {
        const fetchData = async (customer_id) => {
            const result = await callApiUnauthWithHeader(`cart`, 'GET', { customer_id: customer_id })
            setData(result.data);
        };
        if (store.getState().userInfo) {
            fetchData(store.getState().userInfo.token.user.id);
        } else {

            if ('itemCart' in localStorage) {
                let arrItemCart = [];
                arrItemCart = JSON.parse(localStorage.getItem('itemCart'));
                setData(arrItemCart)
            }
            setIsLoading(false);
        }

    }, [store]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        

        const fetchData = async () => {
            let arrid = data.map(v => v.id);
            const result = await callApiUnauthWithHeader(`amountProduct`, 'GET', { arr: JSON.stringify(arrid) })
            setDataAmount();
        };
        fetchData()
            setIsLoading(false);
    }, [data]);

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

    const handleDelete = async (rowData) => {
        if (store.getState().userInfo) {
            await callApiUnauthWithHeader(`cart`, 'DELETE', { product_id: rowData.id, customer_id: store.getState().userInfo.token.user.id })
            let rm = null;
            // eslint-disable-next-line
            data.find((e, i) => {
                if (e.id === rowData.id) {
                    rm = i;
                }
            })
            if (rm !== null) {
                data.splice(rm, 1)
            }
            addToast('Xóa thành công !', { autoDismiss: true, appearance: 'success' })
        } else {
            let rm = null;
            // eslint-disable-next-line
            data.find((e, i) => {
                if (e.id === rowData.id) {
                    rm = i;
                }
            })
            if (rm !== null) {
                data.splice(rm, 1)
            }
            localStorage.setItem('itemCart', JSON.stringify(data));
            addToast('Xóa thành công !', { autoDismiss: true, appearance: 'success' })
        }

    }

    const handleCheckout = async () => {
        if (store.getState().userInfo) {
            await callApiUnauthWithHeader(`checkout`, 'GET', { customer_id: store.getState().userInfo.token.user.id })
            addToast('Thanh toán thành công !', { autoDismiss: true, appearance: 'success' })


        } else {
            addToast('Bạn cần đăng nhập để thanh toán !', { autoDismiss: true, appearance: 'info' })
        }


    }

    return (

        <div className={classes.root}>
            <Grid
                container
            // spacing={4}
            >


                <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <div>
                        {isLoading ? (
                            <div>Loading ...</div>
                        ) : (
                                <div>
                                    <MaterialTable title="Giỏ hàng" columns={columns} data={data} icons={tableIcons}
                                        actions={[
                                            {
                                                icon: DeleteOutline,
                                                tooltip: 'Xóa',
                                                onClick: (event, rowData) => handleDelete(rowData)
                                            }
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1,
                                            search: false
                                        }}

                                        editable={{
                                            onRowUpdate: (newData, oldData) =>
                                              new Promise((resolve, reject) => {
                                                const dataUpdate = [...data];
                                                  const index = oldData.tableData.id;
                                                  dataUpdate[index] = newData;
                                                  setData([...dataUpdate]);
                                                  resolve();
                                              }),
                                          }}
                                    />
                                </div>

                            )}
                    </div>
                </Grid>
                <Grid item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}
                    style={{ marginTop: '20px' }}
                >

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<PaymentIcon />}
                        style={{ float: 'right' }}
                        onClick={handleCheckout}
                    >
                        Thanh toán
                            </Button>

                </Grid>
            </Grid>
        </div>

    );
}

export default CartPage;