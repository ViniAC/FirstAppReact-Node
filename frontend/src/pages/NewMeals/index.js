import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import Button from '@material-ui/core/Button';
import { Grid, InputLabel, Input, TextField, Container, Typography, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: '1120px',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerContent: {
        width: '100%',
        padding: '96px',
        background: '#f0f0f5',
        boxShadow: '0 0 100px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}))
export default function NewMeal() {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [value, setValue] = useState('');

    const fk_id_legal_client = localStorage.getItem('legal_client_id');

    async function handleNewMeal(e) {
        e.preventDefault();

        const data = {
            name,
            description,
            value,
        };

        try {
            await api.post('meals', data, {
                headers: {
                    Authorization: fk_id_legal_client,
                }
            })

            history.push('/home-legal-client');
        } catch (err) {
            alert('Erro ao cadastrar prato, tente novamente.');
        }

    }
    useEffect(() => {
        console.log('NOME:      ', name)
        console.log('DESCRIÇÃO: ', description)
        console.log('VALOR:     ', value);
    }, [name, description, value])
    return (
        <>
            <Container className={classes.container}>
                <Grid container item direction="column" justify="center" alignItems="center">
                    <Grid className={classes.containerContent} container direction="column">
                        <Typography variant="h2" >
                            Cadastro de novos pratos
                        </Typography>
                        <Typography variant="h4">
                            Cadastre pratos deliciosos!
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="Nome do prato"
                            placeholder="Nome do prato"
                            value={name}
                            onChange={event => setName(event.target.value)}

                        />
                        <TextField
                            size="normal"
                            multiline={true}
                            variant="outlined"
                            margin="normal"
                            required
                            label="Descrição"
                            placeholder="Descrição do prato"
                            value={description}
                            onChange={event => setDesc(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="Valor"
                            placeholder="Valor do prato"
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />
                    </Grid>
                    <Button variant="contained" color="primary" onClick={handleNewMeal}>Cadastrar</Button>
                    <Link className="back-link" to="/home-legal-client">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                    </Link>
                </Grid>

            </Container>
        </>
    );
}
