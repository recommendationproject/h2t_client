import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import './main.css';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import callApiUnauth from '../../../utils/apis/apiUnAuth';
const schema = {
    name: {
        presence: { allowEmpty: false, message: 'Tên không được để trống !' },
        length: {
            maximum: 64
        }
    },
    username: {
        presence: { allowEmpty: false, message: 'Tên đăng nhập không được để trống !' },
        length: {
            maximum: 64
        }
    },
    pass: {
        length: {
            minimum:5,
            maximum: 20,
            message: 'Độ dài mật khẩu từ 5-20 !'
        }
    },
    pass2: {
        equality: "pass"
    },
    email: {
        email: true
    },
    phone: {
        length: {
            minimum:10,
            maximum: 11,
            message: 'Độ dài SDT từ 10-11 !'
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

const SignUpPage = () => {
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

    const handleSignUp = async event => {
        event.preventDefault();
        const result = await callApiUnauth(`signup`, 'POST', formState.values)
        console.log(result);
        
    }

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
                            Đăng Ký
                        </Typography>
                        <TextField
                            className={classes.textField}
                            error={hasError('name')}
                            fullWidth
                            helperText={
                                hasError('name') ? formState.errors.name[0] : null
                            }
                            label="Họ Và Tên"
                            name="name"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.name || ''}
                            variant="outlined"
                        />
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
                            error={hasError('pass')}
                            fullWidth
                            helperText={
                                hasError('pass') ? formState.errors.pass[0] : null
                            }
                            label="Mật khẩu"
                            name="pass"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.pass || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('pass2')}
                            fullWidth
                            helperText={
                                hasError('pass2') ? formState.errors.pass2[0] : null
                            }
                            label="Nhập Lại Mật Khẩu"
                            name="pass2"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.pass2 || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('email')}
                            fullWidth
                            helperText={
                                hasError('email') ? formState.errors.email[0] : null
                            }
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={formState.values.email || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('phone')}
                            fullWidth
                            helperText={
                                hasError('phone') ? formState.errors.phone[0] : null
                            }
                            label="Số điện thoại"
                            name="phone"
                            type="number"
                            onChange={handleChange}
                            value={formState.values.phone || ''}
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
                            Đăng ký
                </Button>
                    </form>
                </Grid>
            </Grid>
        </div>

    );
}


export default SignUpPage;