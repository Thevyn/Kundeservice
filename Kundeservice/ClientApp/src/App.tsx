import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Kontakt from './components/Kontakt';
import Admin from "./components/Admin";


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/kontakt' component={Kontakt} />
        <Route path='/admin' component={Admin} />
    </Layout>
);
