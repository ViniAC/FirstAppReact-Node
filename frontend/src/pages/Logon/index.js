import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn, FiBriefcase } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {

    const [email, setEmail] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {

            const response = await api.post('sessions', { email });

            localStorage.setItem('physical_client_email', email);
            localStorage.setItem('physical_client_name', response.data.name);

            history.push('/profile');
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
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Sua senha" />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register-physical-client">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    <Link className="back-link-sou-empresa" to="/logon-legal-client">
                        <FiBriefcase size={16} color="#E02041" />
                        Sou empresa
                    </Link>
                </form>
            </section>

            <img src={heroImg} alt="Heroes" />
        </div>
    );
}