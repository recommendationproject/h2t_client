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
const useStyles = makeStyles(() => ({
  root: {}
}));
const ChangePass = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});

  const store = useStore().getState().userInfo;
  useEffect(() => {
    setValues({
      id: store.token.user.id,
      oldPass: '',
      newPass: '',
      rePass: ''
    })

  }, [store]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const { addToast } = useToasts();
  const handleChangeInfo = async () => {
    let res = await callApiUnauth('user/changepass', 'POST', values);
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
          subheader="Thông tin mật khẩu"
          title="Password"
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
                label="Mật khẩu cũ"
                margin="dense"
                name="oldPass"
                onChange={handleChange}
                required
                type="password"
                value={values.oldPass}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            ></Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mật khẩu mới"
                margin="dense"
                name="newPass"
                onChange={handleChange}
                required
                type="password"
                value={values.newPass}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            ></Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nhập lại mật khẩu"
                margin="dense"
                name="rePass"
                type="password"
                onChange={handleChange}
                required
                value={values.rePass}
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

ChangePass.propTypes = {
  className: PropTypes.string
};

export default ChangePass;
