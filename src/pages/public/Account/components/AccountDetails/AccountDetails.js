import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import callApiUnauth from '../../../../../utils/apis/apiUnAuth';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import {mlts} from '../../actions';
const useStyles = makeStyles(() => ({
  root: {}
}));
const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});

  // const city = useState([]);

  const store = useStore().getState().userInfo;
  useEffect(() => {
    setValues({
      id: store.token.user.id,
      name: store.token.user.name,
      username: store.token.user.username,
      address: store.token.user.address,
      email: store.token.user.email,
      phone: store.token.user.phone,
    })
    
  }, [store]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const handleChangeInfo = async () => {
    console.log(values);
    let res = await callApiUnauth('user', 'PUT', values);
    let sessionuser = JSON.parse(localStorage.getItem('sessionuser'));
    sessionuser.token.user = Object.assign(sessionuser.token.user, values);
    localStorage.setItem('sessionuser', JSON.stringify(sessionuser));
     dispatch(mlts(sessionuser))
    addToast(res.data.msg, { autoDismiss: true, appearance: res.data.type })
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText=""
                label="Tên của bạn"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Địa chỉ"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="CityName"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.CityName}
                variant="outlined"
              >
                {city.map(option => (
                  <option
                    key={option.CityID}
                    value={option.CityID}
                  >
                    {option.CityName}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Số điện thoại"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                required
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleChangeInfo}
          >
            Lưu
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
