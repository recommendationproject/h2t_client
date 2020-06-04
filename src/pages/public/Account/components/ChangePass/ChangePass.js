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
      newPass1:'',
      newPass2:''
    })
  }, [store]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleChangeInfo = () => {
      
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
          subheader="Đổi mật khẩu"
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
                label="Mật khẩu cũ"
                margin="dense"
                name="oldPass"
                type='password'
                onChange={handleChange}
                required
                value={values.oldPass}
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
                label="Mật khẩu mới"
                margin="dense"
                name="newPass1"
                type='password'
                onChange={handleChange}
                required
                value={values.newPass1}
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
                label="Nhập lại mật khẩu"
                margin="dense"
                name="newPass2"
                type='password'
                onChange={handleChange}
                required
                value={values.newPass2}
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
