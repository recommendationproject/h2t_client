import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { addSourceOfItems } from '../SourceOfItems/actions';
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

const ProductAdd = props => {
  const classes = useStyles();
    const [open, setOpen] = useState(props.open);
    
    const [data, setData] = useState({
      ItemID: null,
      Summary:0,
      Price:1000,
      StartTime:moment(Date.now()).format('YYYY-MM-DDThh:mm'),
      EndTime:moment(Date.now()).format('YYYY-MM-DDThh:mm'),
      Description:''
    });

    useEffect(() => {   
      setData(prevData => {
        prevData.ItemID=props.data.ItemID;
        return prevData
      });
      setOpen(props.open);      
    }, [props]);

  
  const handleClose = ()=>{
    props.updateParent()
  }

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(addSourceOfItems(data))
    props.updateParent()
  }
  return (
    
    <div>
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
                      label="Số lượng"
                      margin="dense"
                      name="Summary"
                      onChange={handleChange}
                      type="number"
                      required
                      value={data.Summary}
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
                      name="Price"
                      type="number"
                      onChange={handleChange}
                      required
                      value={data.Price}
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
                      label="Thời gian mở bán"
                      margin="dense"
                      name="StartTime"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      required
                      value={data.StartTime}
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
                      label="Thời gian kết thúc"
                      margin="dense"
                      name="EndTime"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      required
                      value={data.EndTime}
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
                      name="Description"
                      onChange={handleChange}
                      required
                      value={data.Description}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Huỷ
          </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
};

export default ProductAdd;
