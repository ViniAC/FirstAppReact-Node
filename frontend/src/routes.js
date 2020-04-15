import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogonPhysicalClient from './pages/LogonPhysicalClient';
import RegisterPhysicalClient from './pages/RegisterPhysicalClient';
import Home_physical_client from './pages/Home_physical_client';
import Profile_physical_client from './pages/Profile_physical_client';

import LogonLegalClient from './pages/LogonLegalClient'
import RegisterLegalClient from './pages/RegisterLegalClient'
import Home_legal_client from './pages/Home_legal_client';
import Profile_legal_client from './pages/Profile_legal_client';
import Confirmation_order from './pages/ConfirmationOrder';


import NewMeal from './pages/NewMeals';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LogonPhysicalClient} />
                <Route path="/register-physical-client" component={RegisterPhysicalClient} />
                <Route path="/home-physical-client" component={Home_physical_client} />
                <Route path="/profile-physical-client" component={Profile_physical_client} />

                <Route path="/logon-legal-client" component={LogonLegalClient} />
                <Route path="/register-legal-client" component={RegisterLegalClient} />
                <Route path="/home-legal-client" component={Home_legal_client} />
                <Route path="/profile-legal-client" component={Profile_legal_client} />

                <Route path="/meals/new" component={NewMeal} />

                <Route path="/order" component={Confirmation_order} />
            </Switch>
        </BrowserRouter>
    );
}
