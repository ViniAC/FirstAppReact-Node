import React, { useState } from 'react';
// import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
// import Button from '@material-ui/core/Button';
// import { ButtonStyle } from '../../assets/ButtonStyle'
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';

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

            console.log(response);

            if (response.data.verify_id === true) {
                alert(response.data.response_success);
                history.push('/');
            } else {
                alert(`Erro ao cadastrar usuário.`);
            }
        } catch (err) {
            alert('Erro ao cadastrar usuário');
        }

    }

    return (
        <Container>
            <Typography align="center" color="primary">Cadastro Cliente Físico</Typography>
            <Typography align="center">Faça seu cadastro, entre na plataforma e facilite sua vida!</Typography>

            <form onSubmit={handleRegister}>
                <Grid container item direction="column" justify="center" alignItems="center">

                    <TextField
                        variant="outlined"
                        margin="normal"

                        required
                        label="CPF"

                        placeholder="CPF"
                        maxLength="14"
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                    />


                    <TextField
                        variant="outlined"
                        margin="normal"

                        required
                        label="Nome completo"

                        placeholder="Nome completo"
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
                        color="primary"

                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"

                        required
                        // label="Data de Nascimento"
                        // autoFocus="true"

                        type="date"

                        value={date_birth}
                        onChange={event => setDt_birth(event.target.value)}
                    />

                    <Button variant="contained" color="primary" size="large" className="button" type="submit">Cadastrar</Button>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para tela de Logon
                    </Link>
                </Grid>
            </form>



        </Container>
        // <div className="register-container">
        //     <div className="content">
        //         <section>
        //             <img src={logoImg} alt="Be The Hero" />


        //             <h1>Cadastro Cliente Físico</h1>
        //             <p>Faça seu cadastro, entre na plataforma e facilite sua vida!</p>

        // <Link className="back-link" to="/">
        //     <FiArrowLeft size={16} color="#E02041" />
        //     Voltar para tela de Logon
        // </Link>
        //         </section>
        //         <form onSubmit={handleRegister}>

        //             <input
        //                 placeholder="CPF"
        //                 maxLength="14"
        //                 value={cpf}
        //                 onChange={event => setCpf(event.target.value)}
        //             />

        //             <input
        // placeholder="Nome completo"
        // value={name}
        // onChange={event => setName(event.target.value)}
        //             />

        //             <input
        // type="email"
        // placeholder="E-mail"
        // value={email}
        // onChange={event => setEmail(event.target.value)}
        //             />

        //             <input
        // type="password"
        // placeholder="Senha"
        // value={password}
        // onChange={event => setPassword(event.target.value)}
        //             />

        //             <input
        // type="date"
        // placeholder="Data de Nascimento"
        // value={date_birth}
        // onChange={event => setDt_birth(event.target.value)}
        //             />

        //             <Button variant="contained" style={ButtonStyle} className="button" type="submit">Cadastrar</Button>

        //         </form>
        //     </div>
        // </div>
    );
}
