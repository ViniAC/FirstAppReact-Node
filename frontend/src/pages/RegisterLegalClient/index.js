import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
// import Button from '@material-ui/core/Button';
// import { ButtonStyle } from '../../assets/ButtonStyle'
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';

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

        try {
            const response = await api.post('companies', data);
            if (response.data.verify_id === true) {
                alert(`Seu ID de acesso: ${response.data.pk_id_legal_client}`);
                history.push('/');
            } else {
                alert(`Erro ao cadastrar`);
            }

        } catch (err) {
            alert('Erro ao cadastrar usuário');
        }

    }

    return (
        <Container>
            <Typography align="center" color="primary">Cadastro Cliente Jurídico</Typography>
            <Typography align="center">Faça seu cadastro, entre na plataforma e facilite a vida dos seus clientes!</Typography>

                <Grid container item direction="column" justify="center" alignItems="center">

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="CNPJ"
                        placeholder="CNPJ"
                        maxLength="14"
                        value={cnpj}
                        onChange={event => setCnpj(event.target.value)}
                    />


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Nome Fantasia"
                        placeholder="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Email"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Senha"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />



                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Whatsapp"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />

                    <Grid >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="Cidade"
                            placeholder="Cidade"
                            style={{ width: 145 }}
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="UF"
                            placeholder="UF"
                            maxLength="2"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={event => setUf(event.target.value)}

                        />
                    </Grid>



                    <Button onClick={event => handleRegister(event)} variant="contained" color="primary" size="large" >Cadastrar</Button>
                    <Link className="back-link" to="/logon-legal-client">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para tela de Logon
                    </Link>
                </Grid>
        </Container>
    );
}
