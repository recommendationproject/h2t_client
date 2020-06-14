import React, { useState, forwardRef, useEffect, useRef } from 'react';
import './main.css';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import validate from 'validate.js';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import callApiUnauthWithBody from '../../../utils/apis/apiUnAuth';
import { useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'Tên không được để trống !' },
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
    address: {
        presence: { allowEmpty: false, message: 'Địa chỉ không được để trống !' },
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    }, form: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }, title: {
        marginTop: theme.spacing(3)
    }, textField: {
        marginTop: theme.spacing(2)
    }, signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

const CartPage = () => {
    const classes = useStyles();
    const columns = [
        { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />, editable: 'never' },
        { title: 'Tên sản phẩm', field: 'name', editable: 'never' },
        { title: 'Giá', field: 'price', editable: 'never' },
        { title: 'Màu sắc', field: 'color', editable: 'never' },
        { title: 'Kích thước', field: 'size', editable: 'never' },
        { title: 'Số lượng', field: 'amount', type: 'numeric' },
    ];
    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            name: '',
            phone: '',
            comment: '',
            email: '',
            address: '',
            tt:'truc_tiep'
        },
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

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

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

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
        if (store.getState().userInfo) {
            setFormState(formState => ({
                ...formState,
                values: {
                    ...formState.values,
                    customerid: store.getState().userInfo.token.user.id,
                    name: store.getState().userInfo.token.user.name,
                    phone: store.getState().userInfo.token.user.phone,
                    email: store.getState().userInfo.token.user.email,
                    address: store.getState().userInfo.token.user.address,
                }
            }));
        }
    }, [store]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const fetchData = async () => {
           if(data.length>0){
            let arrid = data.map(v => v.id);
            const result = await callApiUnauthWithHeader(`amountProduct`, 'GET', { arr: JSON.stringify(arrid) })
            setDataAmount(result.data);
           }
        };
        fetchData()
        setIsLoading(false);
    }, [data]);
    console.log(dataAmount);
    
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
            await callApiUnauthWithHeader(`cart`, 'DELETE', { product_id: rowData.id, customer_id: store.getState().userInfo.token.user.id, size: rowData.size, color: rowData.color })
            let rm = null;
            // eslint-disable-next-line
            data.find((e, i) => {
                if (e.id === rowData.id && e.size === rowData.size && e.color === rowData.color) {
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
                if (e.id === rowData.id && e.size === rowData.size && e.color === rowData.color) {
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
        if (data.length === 0) {
            addToast('Không có sản phẩm nào trong giỏ hàng !', { autoDismiss: true, appearance: 'info' })
        } else {
            if (store.getState().userInfo) {
                 await callApiUnauthWithBody(`checkout`, 'POST', { customer_id: store.getState().userInfo.token.user.id, comment: formState.values.comment, address: formState.values.address, tt: formState.values.tt });
                addToast('Thanh toán thành công !', { autoDismiss: true, appearance: 'success' })
                setData([])
            } else {
                await callApiUnauthWithBody(`checkoutforguest`, 'POST', {customer: formState.values, product: data})
                addToast('Thanh toán thành công !', { autoDismiss: true, appearance: 'success' })
                 setData([])
                 localStorage.removeItem("itemCart")
            }
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
                    container
                >
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                            <React.Fragment>
                                <Grid item
                                    lg={8}
                                    md={8}
                                    xl={8}
                                    xs={8}>
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
                                                        // eslint-disable-next-line
                                                        dataAmount.forEach(async (e, i) => {                                                                                                                  
                                                            if (e.id === newData.id) {
                                                                console.log(newData);
                                                                if (newData.amount > e.amount)
                                                                    addToast('Trong kho hiện còn : ' + e.amount + ' sản phẩm !', { autoDismiss: true, appearance: 'info' })
                                                                else if (newData.amount <= 0)
                                                                    addToast('Số lượng sản phẩm phải lớn hơn 0 !', { autoDismiss: true, appearance: 'info' })
                                                                else {
                                                                    if (store.getState().userInfo) {
                                                                        await callApiUnauthWithBody(`amountProduct`, 'POST', { productid: newData.id, amount: newData.amount, customerid: store.getState().userInfo.token.user.id,size: newData.size, color: newData.color});
                                                                    } else {
                                                                        let arrItemCart = [];
                                                                        if ('itemCart' in localStorage) {
                                                                            arrItemCart = JSON.parse(localStorage.getItem('itemCart'));
                                                                        }
                                                                        console.log(arrItemCart);
                                                                        
                                                                        let checkExist = null;
                                                                        arrItemCart.forEach((e, i) => {                                                                            
                                                                            if (e.id === newData.id && e.size === newData.size && e.color === newData.color)
                                                                                checkExist = i
                                                                        });
                                                                        arrItemCart[checkExist].amount = parseInt(newData.amount);
                                                                        localStorage.setItem('itemCart', JSON.stringify(arrItemCart));
                                                                    }
                                                                    dataUpdate[index] = newData;
                                                                    setData([...dataUpdate]);
                                                                }
                                                            }
                                                        })

                                                        resolve();
                                                    }),
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item
                                    lg={4}
                                    md={4}
                                    xl={4}
                                    xs={4}>
                                    <form
                                        className={classes.form}
                                    >
                                        <Typography
                                            className={classes.title}
                                            variant="h2"
                                        >
                                            Thông tin
                                        </Typography>
                                        <TextField
                                            className={classes.textField}
                                            error={hasError('name')}
                                            fullWidth
                                            required
                                            helperText={
                                                hasError('name') ? formState.errors.name[0] : null
                                            }
                                            disabled={store.getState().userInfo !== null}
                                            label="Họ Và Tên"
                                            name="name"
                                            onChange={handleChange}
                                            type="text"
                                            value={formState.values.name || ''}
                                            variant="outlined"
                                        />
                                        <TextField
                                            className={classes.textField}
                                            disabled={store.getState().userInfo !== null}
                                            error={hasError('phone')}
                                            fullWidth
                                            required
                                            helperText={
                                                hasError('phone') ? formState.errors.phone[0] : null
                                            }
                                            label="Số điện thoại"
                                            name="phone"
                                            type="number"
                                            onChange={handleChange}
                                            value={formState.values.phone || ''}
                                            variant="outlined"
                                        />
                                        <TextField
                                            className={classes.textField}
                                            fullWidth
                                            label="Yêu cầu khác"
                                            name="comment"
                                            onChange={handleChange}
                                            type="text"
                                            value={formState.values.comment || ''}
                                            variant="outlined"
                                        />
                                        <TextField
                                            className={classes.textField}
                                            disabled={store.getState().userInfo !== null}
                                            error={hasError('email')}
                                            fullWidth
                                            required
                                            helperText={
                                                hasError('email') ? formState.errors.email[0] : null
                                            }
                                            label="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={formState.values.email || ''}
                                            variant="outlined"
                                        />

                                        <TextField
                                            className={classes.textField}
                                            error={hasError('address')}
                                            fullWidth
                                            required
                                            helperText={
                                                hasError('address') ? formState.errors.address[0] : null
                                            }
                                            label="Địa chỉ giao hàng"
                                            name="address"
                                            onChange={handleChange}
                                            value={formState.values.address || ''}
                                            variant="outlined"
                                        />

                                        <FormControl component="fieldset" fullWidth className={classes.textField}>
                                            <FormLabel component="legend">Hình thức thanh toán</FormLabel>
                                            <RadioGroup row aria-label="tt" name="tt" defaultValue="truc_tiep" onChange={handleChange}>
                                                <FormControlLabel value="truc_tiep" control={<Radio color="primary" />} label="Thanh toán trực tiếp" />
                                                <FormControlLabel value="truc_tuyen" control={<Radio color="primary" />} label="Thanh toán trực tuyến(Thanh toán qua thẻ VISA/MASTER)" />
                                            </RadioGroup>
                                        </FormControl>

                                        <Button
                                            className={classes.signInButton}
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={<PaymentIcon />}
                                            onClick={handleCheckout}
                                            fullWidth
                                            disabled={!formState.isValid || data.length <= 0}
                                        >
                                            Thanh toán
                            </Button>
                                    </form>
                                </Grid>
                            </React.Fragment>
                        )}
                </Grid>
                {/* <Grid item
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

                </Grid> */}
            </Grid>
        </div>

    );
}

export default CartPage;