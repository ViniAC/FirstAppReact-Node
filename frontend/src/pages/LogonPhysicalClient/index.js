import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn, FiBriefcase } from 'react-icons/fi';
import api from '../../services/api';
import {Button, Container} from '@material-ui/core';
import { ButtonStyle } from '../../assets/ButtonStyle'

export default function Logon() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // const buttonStyle = {
    //     width: "100%",
    //     height: 60,
    //     background: "#e02041",
    //     color: "#FFF",
        
    // }

async function handleLogin(e) {
    e.preventDefault();

    try {

        const response = await api.post('session-physical-client', { email, password });

        localStorage.setItem('physical_client_email', email);
        localStorage.setItem('physical_client_password', password);
        localStorage.setItem('physical_client_name', response.data.name);
        localStorage.setItem('physical_client_id', response.data.pk_id_physical_client);

        history.push('/home-physical-client');
    } catch (err) {
        alert('Falha no login, tente novamente.');

    }
}

return (
    <Container>
        <section className="form">
            <img src={logoImg} alt="logo" />

            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="contained" style={ButtonStyle} className="button" type="submit">Entrar</Button>

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
    </Container>
);
}