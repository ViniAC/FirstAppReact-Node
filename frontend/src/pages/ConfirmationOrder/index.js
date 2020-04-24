import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import Header from '../Components/Header';
import Orders from '../Components/Orders';
import { Container, Grid, Button } from '@material-ui/core';


export default function ConfirmationOrder() {

  const [orders, setOrders] = useState([]);
  const [pk_id_order, setIdOrder] = useState('');

  const physical_client_name = localStorage.getItem('physical_client_name');
  const id_order = localStorage.getItem('id_order');
  const physical_client_id = localStorage.getItem('physical_client_id');

  const history = useHistory();

  async function handleSaveButton() {
    const data = orders;
    try {
      await api.put('order', data);
      alert('pedido alterado com sucesso');
      history.push('/order');
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


  return (
    <>
      <Header profileType="profile-physical-client" name={physical_client_name} />

      <Container>

        <h1>Pedido em andamento:</h1>


        <Grid xs={12} container item direction="row" spacing={2}>
          {orders.map(order => (
            <Grid key={order.name}
              item xs={12} sm={6} md={4} >

              <Orders
                name={order.name}
                description={order.description}
                quantity={order.quantity}
                item_price={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.item_price)}
                unit_price={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.unit_price)}
                total_price={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total_price)}
              />

            </Grid>

          ))}
        </Grid>
        <Button variant="contained" onClick={() => handleBackHome()} type="button">Voltar</Button>
        <Button variant="contained" onClick={() => handleCancelOrder()} type="button">Cancelar pedido</Button>
      </Container>
    </>
  );
}
