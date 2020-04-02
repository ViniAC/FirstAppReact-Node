import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterPhysicalClient from './pages/RegisterPhysicalClient';
import Profile from './pages/Profile';

import LogonLegalClient from './pages/LogonLegalClient'
import RegisterLegalClient from './pages/RegisterLegalClient'
import NewMeal from './pages/NewMeals';
import ProfileLegalClient from './pages/profile_legal_clients';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register-physical-client" component={RegisterPhysicalClient} />
                <Route path="/profile" component={Profile} />

                <Route path="/logon-legal-client" component={LogonLegalClient} />
                <Route path="/register-legal-client" component={RegisterLegalClient} />
                <Route path="/profile-legal-clients" component={ProfileLegalClient} />
                
                <Route path="/meals/new" component={NewMeal} />
            </Switch>
        </BrowserRouter>
    );
}
