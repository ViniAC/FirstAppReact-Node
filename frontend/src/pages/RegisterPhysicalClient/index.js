import React, { useState } from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {

    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date_birth, setDt_birth] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            cpf,
            name,
            email,
            date_birth,
            password,
        };

        console.log(data);

        try {
            const response = await api.post('users', data);
            alert(`Cadastro realizado com sucesso!`);
            console.log(response)
            history.push('/');
        } catch (err) {
            alert('Erro ao cadastrar usuário');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />


                    <h1>Cadastro Cliente Físico</h1>
                    <p>Faça seu cadastro, entre na plataforma e facilite sua vida!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para tela de Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input
                        placeholder="CPF"
                        maxLength="14"
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                    />

                    <input
                        placeholder="Nome completo"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input 
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <input
                        placeholder="Data de Nascimento"
                        value={date_birth}
                        onChange={event => setDt_birth(event.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
