import React, { useEffect, useState, useRef, forwardRef } from 'react';
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
} from '@material-ui/icons';

import { Grid, TextField, Button } from '@material-ui/core';
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import validate from 'validate.js';

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'Tên chương trình khuyến mãi không được để trống !' }
  },
  StartTime: {
    presence: { allowEmpty: false, message: 'Thời gian bắt đầu không được để trống !' },
    datetime: {
      earliest: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      message: "Thời gian bắt đầu phải lớn hơn hiện tại !"
    }
  },
  EndTime: {
    presence: { allowEmpty: false, message: 'Thời gian kết thúc không được để trống !' },
      equality: {
        attribute: "StartTime",
        message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu !",
        comparator: function(v1, v2) {
          return (v1 > v2)
        }
      },    
  }
};

const ItemsTable = () => {
  const columns = [
    { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'name' },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);
  useEffect(() => {
    const fetchData = async () => {
      const resultItem = await callApiUnAuth(`product/promotionadd`, 'GET', [])
      const resultPromotionType = await callApiUnAuth(`product/promotiontype`, 'GET', [])
      setItem(resultItem.data);
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          type: resultItem.data[0].typeid
        },
      }));
      setType(resultPromotionType.data);
    };
    fetchData();
  }, []);

  const [item, setItem] = useState([]);
  const [type, setType] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  validate.extend(validate.validators.datetime, {
    parse: function (value, options) {
      return +moment.utc(value);
    },

    format: function (value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DDTHH:mm";
      return moment.utc(value).format(format);
    }
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
        item: [],
        type: null,
        name: null,
        StartTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
        EndTime: moment(new Date().setTime(new Date().getTime() + (60*60*1000))).format('YYYY-MM-DDTHH:mm'),
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema, { fullMessages: false });
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  // const [data, setData] = useState({
  //   item: [],
  //   type: null,
  //   condition: null,
  //   StartTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
  //   EndTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
  // });


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [item]);

  const handleChange = event => {
    event.persist();    
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? (event.target.checked ? 1 : 0)
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const { addToast } = useToasts();
  const handleSubmit = async () => {
    setIsCreating(true);
    const rs = await callApiUnAuth(`product/promotion`, 'POST', formState.values);
    if (rs.data.type === 'success') {
      const resultItem = await callApiUnAuth(`product/promotionadd`, 'GET', [])
      setItem(resultItem.data);
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          item: []
        }
      }))
      // NotificationManager.success(rs.data.type, rs.data.msg, 3000);
      addToast(rs.data.msg, { autoDismiss: true, appearance: rs.data.type })
    } else {
      addToast(rs.data.msg, { autoDismiss: true, appearance: rs.data.type })
      // NotificationManager.success('fail', 'Ko thành công', 3000);
    }
   
    setIsCreating(false);
  }

  const itemchecked = (rows) => {
    // setData(oldData => ({
    //   ...oldData,
    //   item: rows.map(e => e.ItemID)
    // }));
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        item: rows.map(e => e.id)
      }
    }))
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
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
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={8}
              xs={8}>
              <MaterialTable
                title="Sản Phẩm"
                columns={columns}
                data={item}
                icons={tableIcons}
                options={{
                  selection: true
                }}
                onSelectionChange={(rows) => itemchecked(rows)}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={4}>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  item
                  md={12}
                  xs={12}>
                  <TextField
                    fullWidth
                    label="Tên khuyến mãi"
                    margin="dense"
                    name="name"
                    onChange={handleChange}
                    required
                    error={hasError('name')}
                    helperText={
                      hasError('name') ? formState.errors.name[0] : null
                    }
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}>
                  <TextField
                    fullWidth
                    label="Chính sách khuyến mãi"
                    margin="dense"
                    name="type"
                    onChange={handleChange}
                    required
                    select
                    error={hasError('type')}
                    helperText={
                      hasError('type') ? formState.errors.type[0] : null
                    }
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {type.map(option => (
                      <option
                        key={option.typeid}
                        value={option.typeid}
                      >
                        {option.typename}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Thời gian bắt đầu"
                    margin="dense"
                    name="StartTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={hasError('StartTime')}
                    helperText={
                      hasError('StartTime') ? formState.errors.StartTime[0] : null
                    }
                    value={formState.values.StartTime}
                    onChange={handleChange}
                    required
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
                    label="Thời gian kết thúc"
                    margin="dense"
                    name="EndTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={hasError('EndTime')}
                    helperText={
                      hasError('EndTime') ? formState.errors.EndTime[0] : null
                    }
                    value={formState.values.EndTime}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus disabled={isCreating || !formState.isValid || !formState.values.item.length}>
                    Tạo khuyến mãi
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        )}
    </div>
  );
};

export default ItemsTable;
