import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { FiPower, FiArrowLeft } from 'react-icons/fi';

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
  function handleLogout() {
    localStorage.clear();
    history.push('/');
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
    <div className="home-container">
      <header>
        <div>
          <img src={logoImg} alt="Be The Hero" />

          <span>Olá, {physical_client_name}. </span>
        </div>
        <div className="buttons">
          <button onClick={handleBackHome} type="button">
            <FiArrowLeft size={18} color="#E02041" />
          </button>

          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#E02041" />
          </button>
        </div>
      </header>

      <h1>Seu pedido:</h1>
      <h2> {pk_id_order} </h2>
      <ul >
        {orders.map(order => (
          <li >
            <strong>PRATO:</strong>
            <p>{order.description}</p>

            <strong>Valor Unitário:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.unit_price)}</p>

            <strong>Quantidade de items:</strong>
            <p>{order.quantity}</p>

            <strong>Valor item:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.item_price)}</p>

            <strong>Valor Total do pedido:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total_price)}</p>
          </li>
        ))
        }
      </ul>

      <button id='cancelOrder' onClick={handleCancelOrder}>Cancelar pedido</button>

    </div >
  );
}
