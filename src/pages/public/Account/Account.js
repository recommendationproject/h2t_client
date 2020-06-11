import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { AccountDetails, OrdersTable, ChangePass } from './components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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


const Account = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Tài khoản" {...a11yProps(0)} />
          <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
          <Tab label="Đơn hàng" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className={classes.content}>
          <AccountDetails/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className={classes.content}>
          <ChangePass/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className={classes.content}>
          <OrdersTable />
        </div>
      </TabPanel>


    </div>
  );
};

export default Account;
