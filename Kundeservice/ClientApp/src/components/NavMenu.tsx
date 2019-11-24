import * as React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import NavMenuStyle from "../styles/NavMenuStyle";

const useStyles = NavMenuStyle;

const NavMenu = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolBar}>
                        <Typography variant="h6" className={classes.title}>
                            FinnReise FAQ
                        </Typography>
                        <Button color="inherit" component={Link} to="/" disableRipple>FAQ</Button>
                        <Button color="inherit" component={Link} to="/kontakt" disableRipple>Kontakt</Button>
                        <Button color="inherit" component={Link} to="/Admin" disableRipple>Admin</Button>
                    </Toolbar>
                </Container>
               
            </AppBar>
        </div>
    );
    };

export default NavMenu;

   

