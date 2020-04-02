import React, { useState } from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {

    const [cnpj, setCnpj] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            cnpj,
            name,
            email,
            whatsapp,
            city,
            uf,
            password,
        };

        console.log(data);

        try {
            const response = await api.post('companies', data);
            alert(`Seu ID de acesso: ${response.data.pk_id_legal_client}`);
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


                    <h1>Cadastro Cliente Jurídico</h1>
                    <p>Faça seu cadastro, entre na plataforma e facilite a vida dos seus clientes!</p>

                    <Link className="back-link" to="/logon-legal-client">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para tela de Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input
                        placeholder="CNPJ"
                        maxLength="14"
                        value={cnpj}
                        onChange={event => setCnpj(event.target.value)}
                    />
                    <input
                        placeholder="Nome"
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
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                        <input placeholder="UF" maxLength="2" style={{ width: 80 }}
                            value={uf}
                            onChange={event => setUf(event.target.value)}
                        />
                    </div>


                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
