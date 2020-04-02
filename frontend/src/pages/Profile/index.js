import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

export default function Profile() {
    const history = useHistory();
    const physical_client_name = localStorage.getItem('client_name');

    function handleLogout() {

        localStorage.clear();
        history.push('/');


    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />

                <span>Bem vindo(a), {physical_client_name}. </span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Pratos:</h1>
            <ul>
                <li>
                    <strong>PRATO:</strong>
                    <p>Caso teste</p>

                    <strong>Descrição:</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR:</strong>
                    <p>120,00</p>

                    <button id="btn_make_order">
                        Fazer pedido
                    </button>


                </li>
                <li>
                    <strong>PRATO:</strong>
                    <p>Caso teste</p>

                    <strong>Descrição:</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR:</strong>
                    <p>120,00</p>

                    <button id="btn_make_order">
                        Fazer pedido
                    </button>
                </li>
                <li>
                    <strong>PRATO:</strong>
                    <p>Caso teste</p>

                    <strong>Descrição:</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR:</strong>
                    <p>120,00</p>

                    <button id="btn_make_order">
                        Fazer pedido
                    </button>
                </li>
                <li>
                    <strong>PRATO:</strong>
                    <p>Caso teste</p>

                    <strong>Descrição:</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR:</strong>
                    <p>120,00</p>

                    <button id="btn_make_order">
                        Fazer pedido
                    </button>
                </li>
            </ul>

        </div>

    );
}