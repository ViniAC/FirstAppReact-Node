import React from 'react';

import { AppBar, Toolbar, Typography  } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import { red } from '@material-ui/core/colors';



const useStyles = makeStyles(() => ({
    header: {
        flex: 1
    },
    cor: {
        primary: red
    }
}));
export default function Header(props){
    const classes = useStyles();
    return(
        <AppBar className={classes.cor} position="static">
            <Toolbar className={classes.cor}>
                <img src="/assets/waiter.jpg" alt=""/>
                <Typography>Olá, {props.name}!</Typography>
            </Toolbar>
            
        </AppBar>
    );
}