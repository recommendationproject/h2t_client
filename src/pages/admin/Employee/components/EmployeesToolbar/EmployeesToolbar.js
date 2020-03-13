import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import { addEmployee } from '../../actions';
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

const EmployeesToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const firstUpdate = useRef(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = useState({
    name: 'name',
    price: '0',
    description: 'description',
    amount: '0',
    category_id: 'category000000000002',
    img: null
  });
  const store = useStore();
  const category = store.getState().adminInfo.category;
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const dispatch = useDispatch();
  const handleChangeFile = file => {  
    setValues({
      ...values,
      img: file
    })
  };
  const handleAccept = () => {    
    dispatch(addEmployee(values));
  };



  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button> */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          THÊM SẢN PHẨM
        </Button>
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
                  helperText=""
                  label="Tên sản phẩm"
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
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText=""
                  label="Giá"
                  margin="dense"
                  name="price"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.price}
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
                  helperText=""
                  label="Số lượng"
                  margin="dense"
                  name="amount"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.amount}
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
                  helperText=""
                  label="Mô tả"
                  margin="dense"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                  variant="outlined"
                  multiline={true}
                  rows={4}
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Loại sản phẩm"
                  margin="dense"
                  name="category_id"
                  onChange={handleChange}
                  required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.category_id}
                  variant="outlined"
                >
                  {category.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name +' - '+ option.gender}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <DropzoneArea
                  onChange={handleChangeFile}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  filesLimit={5}
                  dropzoneText={'Ảnh sản phẩm'}
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  initialFiles={[]}
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Huỷ
          </Button>
            <Button onClick={handleAccept} color="primary" autoFocus>
              Xác nhận
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

EmployeesToolbar.propTypes = {
  className: PropTypes.string
};

export default EmployeesToolbar;
