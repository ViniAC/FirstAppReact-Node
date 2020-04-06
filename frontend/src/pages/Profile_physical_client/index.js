import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function Profile() {


    const history = useHistory();

    const [physical_clients, setClient] = useState([]);

    const physical_client_id = localStorage.getItem('physical_client_id');
    const physical_client_name = localStorage.getItem('physical_client_name');


    function handleBackHome() {
        history.push('home-legal-client')
    }


    useEffect(() => {
        api.get('profile-physical-client', {
            headers: {
                Authorization: physical_client_id,
            }
        }).then(response => {
            setClient(response.data);
        })
    }, [physical_client_id]);


    return (
        <div className="home-container">
            <header>

                <span>Olá, {physical_client_name}. </span>

                <button onClick={handleBackHome} type="button">
                    <FiArrowLeft size={18} color="#E02041" />
                </button>


            </header>
            <h1>Seus dados: </h1>
            <ul>
                {physical_clients.map(physical_client => (
                    <li key={physical_client.pk_id_physical_client}>
                        <strong>Nome:</strong>
                        <p>{physical_client.name}</p>

                        <strong>CPF:</strong>
                        <p>{physical_client.cpf}</p>

                        <strong>E-Mail:</strong>
                        <p>{physical_client.email}</p>

                        <strong>Data de Nascimento:</strong>
                        <p>{physical_client.date_birth}</p>

                    </li>
                ))}
            </ul>
        </div>

    );

}