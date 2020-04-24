import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import PersonIcon  from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const useStyles = makeStyles(() => ({
    header: {
        
        backgroundColor: "black"
    },
    typography: {
        flex: 1,
        color: "white"
    },
    fi: {
        
        borderStyle: "solid",
        border: 1,
        borderRadius: 5, 
        color: "white",
        marginRight: 5
    }

}));
export default function Header(props){
    const history = useHistory();
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    function handleMyProfile() {
        console.log(props.profileType);
        history.push(props.profileType);
    }

    const classes = useStyles();
    return(
        <AppBar className={classes.header} position="static">
            <Toolbar >
                
                <Typography className={classes.typography}>Olá, {props.name}!</Typography>
                
                <Button className={classes.fi}>
                    <PersonIcon  onClick={handleMyProfile} />
                </Button>
                <Button className={classes.fi}>
                    <PowerSettingsNewIcon  onClick={handleLogout} />
                </Button>
            </Toolbar>
            
        </AppBar>
    );
}