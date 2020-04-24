import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../Components/Header';
import { Container, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles({

  media: {

    minWidth: 500
  },
  gridStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  }

});

export default function ConfirmationOrder() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [pk_id_order, setIdOrder] = useState('');

  const [edit, setEdit] = React.useState({
    edit: true
  });

  const handleClickChangeEdit = () => {
    setEdit({ ...edit, edit: !edit.edit });
  };
  const physical_client_name = localStorage.getItem('physical_client_name');
  const id_order = localStorage.getItem('id_order');
  const physical_client_id = localStorage.getItem('physical_client_id');

  const history = useHistory();

  async function handleSaveButton() {
    let orderList = orders;

    try {
      await api.put('order', orderList);
      let totalPrice = 0;
      for (let i = 0; i < orderList.length; i++) {
        orderList[i].item_price = orderList[i].unit_price * orderList[i].quantity;
        totalPrice += orderList[i].item_price;
      }
      for (let index = 0; index < orderList.length; index++) {
        orderList[index].total_price = totalPrice;
      }
      setOrders(orderList);
      history.push('/order');
      alert('pedido alterado com sucesso');
    } catch (err) {
      console.log(err);
    }
  }

  function handleCancelOrder() {
    api.delete('order', {
      headers: {
        pk_id_order: id_order,
        id_physical_client: physical_client_id
      }
    }).then(response => {
      alert('Pedido deletado com sucesso!');
      history.push('/home-physical-client');
    })
  }

  function handleBackHome() {
    history.push('/home-physical-client');
  }

  useEffect(() => {
    api.get('order', {
      headers: {
        Authorization: id_order,
        id_physical_client: physical_client_id
      }
    }).then(response => {
      setIdOrder(response.data[0].pk_id_order);
      setOrders(response.data);
    })
  }, [id_order]);
  function changeQuantityOrder(event, mealId) {
    let copyOfOrders = orders.slice();
    for (let index = 0; index < copyOfOrders.length; index++) {
      if (copyOfOrders[index].fk_id_meal === mealId) {
        if (event.target.value <= 0) {
          return
        }
        copyOfOrders[index].quantity = event.target.value
        setOrders(copyOfOrders)
        return
      }
    }
  }
  return (
    <>
      <Header profileType="profile-physical-client" name={physical_client_name} />

      <Container>

        <h1>Pedido em andamento:</h1>


        <Grid xs={12} container item direction="row" spacing={2}>
          
          {orders.map(order => (
            <Grid key={order.name}
              item xs={12} sm={6} md={4} >
              <Card>
                <CardActionArea>

                  <CardContent >
                    <Grid className={classes.gridStyle} container >
                      <Typography gutterBottom variant="h5" component="h2">
                        {order.name}
                      </Typography>
                    </Grid>

                    <Typography variant="body2" color="textSecondary" component="p">
                      {order.description}
                    </Typography>

                    <TextField
                      type="number"
                      disabled={edit.edit}
                      value={order.quantity}
                      onChange={(event) => {
                        changeQuantityOrder(event, order.fk_id_meal)
                      }}
                    >
                      Quantidade:{order.quantity}
                    </TextField>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Preço unitário:{order.unit_price}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Preço do Item:{order.item_price}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      Preço Total:{order.total_price}
                    </Typography>
                  </CardContent>
                </CardActionArea>

              </Card>

            </Grid>

          ))}
          
        </Grid>
        <Link>
            <IconButton
              onClick={handleClickChangeEdit}>
              <EditIcon />
            </IconButton>
          </Link>
        <Button
            variant="contained"
            color="primary"
            onClick={handleSaveButton}>
            Salvar
                    </Button>
        <Button variant="contained" onClick={() => handleBackHome()} type="button">Voltar</Button>
        <Button color="secondary" variant="contained" onClick={() => handleCancelOrder()} type="button">Cancelar pedido</Button>
      </Container>
    </>
  );
}
