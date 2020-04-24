import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';

const useStyles = makeStyles({

    media: {

        minWidth: 500
    },
    gridStyle: {
        display: 'flex',
        justifyContent: 'space-between'
    }

});

export default function Meals({ name, description, quantity, unit_price, item_price, total_price }) {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea>

                <CardContent >
                    <Grid className={classes.gridStyle} container >
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                    </Grid>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Quantidade:{quantity}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Preço unitário:{unit_price}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Preço do Item:{item_price}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        Preço Total:{total_price}
                    </Typography>

                </CardContent>

            </CardActionArea>

        </Card>
    );
}

