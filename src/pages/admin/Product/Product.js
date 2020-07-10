import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ProductsTable, ProductsToolbar, OrdersTable, DataWareHouseTable, DataWareHouseToolbar, SupplyTable, SupplyToolbar } from './components';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Product = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const store = useSelector(state => state).adminInfo.token.user.groupid;
  const handleChange = (event, newValue) => {
    console.log(newValue);

    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      {store === 'saler' ? (
        <React.Fragment>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Sản phẩm" {...a11yProps(0)} />
              <Tab label="Đơn hàng" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <div className={classes.content}>
              <ProductsTable />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrdersTable />
          </TabPanel>
        </React.Fragment>
      ) : (
          <React.Fragment>
            {store === 'warehouse_staff' ? (
              <React.Fragment>
                <AppBar position="static">
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Sản phẩm" {...a11yProps(0)} />
                    <Tab label="Quản lý nhà cung cấp" {...a11yProps(1)} />
                    <Tab label="Quản lý kho" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                  <div className={classes.content}>
                    <ProductsTable />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <SupplyToolbar />
                  <div className={classes.content}>
                    <SupplyTable />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <DataWareHouseToolbar />
                  <div className={classes.content}>
                    <DataWareHouseTable />
                  </div>
                </TabPanel>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="Sản phẩm" {...a11yProps(0)} />
                      <Tab label="Đơn hàng" {...a11yProps(1)} />
                      <Tab label="Quản lý nhà cung cấp" {...a11yProps(2)} />
                      <Tab label="Quản lý kho" {...a11yProps(3)} />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={value} index={0}>
                    <ProductsToolbar />
                    <div className={classes.content}>
                      <ProductsTable />
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <OrdersTable />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <SupplyToolbar />
                    <div className={classes.content}>
                      <SupplyTable />
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <DataWareHouseToolbar />
                    <div className={classes.content}>
                      <DataWareHouseTable />
                    </div>
                  </TabPanel>
                </React.Fragment>
              )}
          </React.Fragment>
        )}
    </div>
  );
};

export default Product;
