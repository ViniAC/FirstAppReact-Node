import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {

    const [pk_id_legal_client, setId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session-legal-client', { pk_id_legal_client, password });

            localStorage.setItem('legal_client_name', response.data.name);
            localStorage.setItem('legal_client_password', response.data.password);
            localStorage.setItem('legal_client_id', response.data.pk_id_legal_client);

            history.push('/home-legal-client');
        } catch (err) {
            alert('Falha no login, tente novamente.');

        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        placeholder="Seu ID"
                        value={pk_id_legal_client}
                        onChange={e => setId(e.target.value)}
                    />
                    <input type="password" placeholder="Sua senha" value={password}
                        onChange={e => setPassword(e.target.value)}/>
                        
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register-legal-client">
                        <FiLogIn size={16} color="#E02041" />
                        Não sou afiliado
                    </Link>
                    <Link className="back-link-physical-client" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para logon Cliente Físico
                    </Link>
                </form>
            </section>

            <img src={heroImg} alt="Heroes" />
        </div>
    );
}