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

import { useStore } from 'react-redux';
import { Grid, TextField, Button } from '@material-ui/core';
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import moment from 'moment';
import validate from 'validate.js';


const Promotion = () => {
  const columns = [
    { title: 'Avatar', field: 'images', render: rowData => <img src={rowData.images} alt={rowData.name} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
    { title: 'Tên CTKM', field: 'dname' },
    { title: 'Tên sản phẩm', field: 'name' },
    { title: 'Điều kiện khuyến mãi', field: 'typename' },
    { title: 'Thời gian bắt đầu', field: 'start_date', render: rowData => moment(rowData.starttime).format('hh:mm:ss DD-MM-YYYY') },
    { title: 'Thời gian kết thúc', field: 'to_date', render: rowData => moment(rowData.endtime).format('hh:mm:ss DD-MM-YYYY') },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const firstUpdate = useRef(true);

  useEffect(() => {
    const fetchData = async (userid) => {
      const resultItem = await callApiUnAuth(`product/promotion`, 'GET', [])      
      setItem(resultItem.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [item]);

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
              md={12}
              xs={12}>
              <MaterialTable
                title="Sản Phẩm"
                columns={columns}
                data={item}
                icons={tableIcons}
                // options={{
                //   selection: true
                // }}
                // onSelectionChange={(rows) => itemchecked(rows)}
              />
            </Grid>
          </Grid>

        )}
    </div>
  );
};

export default Promotion;
