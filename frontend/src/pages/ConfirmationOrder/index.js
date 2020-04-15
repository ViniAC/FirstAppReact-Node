import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { FiPower } from 'react-icons/fi';

export default function ConfirmationOrder() {

  const [orders, setOrders] = useState([]);

  const physical_client_name = localStorage.getItem('physical_client_name');
  const id_order = localStorage.getItem('id_order');

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    api.get('order', {
      headers: {
        Authorization: id_order,
      }
    }).then(response => {
      console.log(response.data)
      setOrders(response.data);
    })
  }, [id_order]);


  return (
    <div className="home-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />

        <span>Olá, {physical_client_name}. </span>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>

      </header>

      <h1>Seu pedido:</h1>

      <h2> {id_order} </h2>

      <ul >
        {orders.map(order => (
          <li key={order.pk_id_order}>
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



    </div >
  );
}
