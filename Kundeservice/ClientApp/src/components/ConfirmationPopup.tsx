import React from 'react';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import Snackbar from "@material-ui/core/Snackbar";

interface ConfirmationPopupProps {
    message: string;
    variant: 'success' | 'error';
    onClose: () => void;
    open: boolean;
}


const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));




const ConfirmationPopup = ({ message, onClose, variant, open} : ConfirmationPopupProps) => {
            const classes = useStyles1();

            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    autoHideDuration={2000}
                    open={open}
                    onClose={onClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                >
            <SnackbarContent
                className={clsx(classes[variant])}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
        </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
                </Snackbar>
            )
    };

export default ConfirmationPopup;