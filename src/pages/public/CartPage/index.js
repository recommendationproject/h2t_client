import React, { useState, forwardRef, useEffect } from 'react';
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
        { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
        { title: 'Tên sản phẩm', field: 'name' },
        { title: 'Giá', field: 'price' },
        { title: 'Số lượng', field: 'amount' },
    ];
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
        }

    }, [store]);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
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

    const handleDelete = (rowData) => {
        // dispatch(deleteProduct(rowData.ItemID));
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