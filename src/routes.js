import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProductView from './views/ProductView';
import AddProductView from './views/AddProductView';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ProductView} />
                <Route path="/add" component={AddProductView} />
                <Route path="/edit/:id" component={AddProductView} />
            </Switch>
        </BrowserRouter>
    );
}