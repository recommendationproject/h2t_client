import React, { useState, useEffect,useRef } from 'react';
import validate from 'validate.js';
import './main.css';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../Account/actions';
import { useToasts } from 'react-toast-notifications';
const schema = {
    username: {
        presence: { allowEmpty: false, message: 'Tên đăng nhập không được để trống !' },
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'Mật khẩu không được để trống !' },
        length: {
            minimum:5,
            maximum: 20,
            message: 'Độ dài mật khẩu từ 5-20 !'
        }
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        //   backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

const SignInPage = props => {
    const history = props.route.history;
    const classes = useStyles();
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
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
    const dispatch = useDispatch();
    const handleSignUp = async event => {
        event.preventDefault();
        dispatch(signIn(formState.values)) 
    }

    const firstUpdate = useRef(true);
    const store = useSelector(state => state).userInfo;
    const { addToast } = useToasts();
    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if (store.token.success===false) {
          addToast(store.token.msg, { autoDismiss: true, appearance: 'error' })
      }else{
        localStorage.setItem("sessionuser", JSON.stringify(store));    
        addToast('Đăng nhập thành công !', { autoDismiss: true, appearance: 'success' })
        history.push('/');
      }
    }, [store, history]);

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (

        <div className={classes.root}>
            <Grid
                container
            >

                <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <form
                        className={classes.form}
                        onSubmit={handleSignUp}
                    >
                        <Typography
                            className={classes.title}
                            variant="h2"
                        >
                            Đăng Nhập
                        </Typography>

                        <TextField
                            className={classes.textField}
                            error={hasError('username')}
                            fullWidth
                            helperText={
                                hasError('username') ? formState.errors.username[0] : null
                            }
                            label="Tên Đăng Nhập"
                            name="username"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.username || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('password')}
                            fullWidth
                            helperText={
                                hasError('password') ? formState.errors.password[0] : null
                            }
                            label="Mật khẩu"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.password || ''}
                            variant="outlined"
                        />

                        <Button
                            className={classes.signInButton}
                            color="primary"
                            disabled={!formState.isValid}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Đăng nhập
                </Button>
                    </form>
                </Grid>
            </Grid>
        </div>

    );
}


export default SignInPage;