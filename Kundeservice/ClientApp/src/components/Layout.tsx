import * as React from 'react';

import NavMenu from './NavMenu';
import CssBaseline from "@material-ui/core/CssBaseline";


const Layout = (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <CssBaseline />
        <NavMenu />
        <div style={{backgroundColor: '#59bba6', minHeight: '100vh'}}>
            {props.children}
        </div>
    </React.Fragment>
);

export default Layout;