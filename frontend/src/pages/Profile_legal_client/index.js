import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function Profile() {

    const [legal_clients, setClient] = useState([]);

    const history = useHistory();


    const legal_client_id = localStorage.getItem('legal_client_id');
    const legal_client_name = localStorage.getItem('legal_client_name');



    function handleBackHome() {
        history.push('home-legal-client')
    }



    useEffect(() => {
        api.get('profile-legal-client', {
            headers: {
                Authorization: legal_client_id,
            }
        }).then(response => {
            setClient(response.data);
        })
    }, [legal_client_id]);


    return (
        <div className="home-container">
            <header>

                <span>Olá, {legal_client_name}. </span>

                <button onClick={handleBackHome} type="button">
                    <FiArrowLeft size={18} color="#E02041" />
                </button>


            </header>
            <h1>Seus dados: </h1>
            <ul>
                {legal_clients.map(legal_client => (
                    <li key={legal_client.pk_id_legal_client}>
                        <strong>Nome:</strong>
                        <p>{legal_client.name}</p>

                        <strong>CNPJ:</strong>
                        <p>{legal_client.cnpj}</p>

                        <strong>E-Mail:</strong>
                        <p>{legal_client.email}</p>

                        <strong>Whatsapp:</strong>
                        <p>{legal_client.whatsapp}</p>

                        <strong>Cidade:</strong>
                        <p>{legal_client.city}</p>

                        <strong>Estado:</strong>
                        <p>{legal_client.uf}</p>

                    </li>
                ))}
            </ul>
        </div>

    );

}