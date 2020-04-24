import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import Button from '@material-ui/core/Button';
import { Grid, InputLabel, Input, TextField, Container, Typography, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header';

const useStyles = makeStyles((theme) => ({
 
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
    const legal_client_name = localStorage.getItem('legal_client_name');

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
    function handleBackHome() {

        history.push('/home-legal-client');
    }
    return (
        <>
            <Header profileType="profile-legal-client" name={legal_client_name} />
            <Container className={classes.container}>
                <Button style={{color: "#3f51b5", marginTop:"10px"}}  onClick={handleBackHome}>


                    <FiArrowLeft style={{marginRight:"5px"}} size={18} color="#3f51b5" />
                        
                    
                    <Typography>Voltar</Typography>


                </Button>
                <Grid container item direction="column" justify="center" alignItems="center">
                    <Grid className={classes.containerContent} container direction="column">
                        <Typography variant="h3" >
                            Cadastro de novos pratos
                        </Typography>
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline={true}
                            rowsMax="3"
                            required
                            label="Nome do prato"
                            placeholder="Nome do prato"
                            value={name}
                            onChange={event => setName(event.target.value)}

                        />
                        <TextField
                            size="normal"
                            variant="outlined"
                            margin="normal"
                            multiline={true}
                            rowsMax="10"
                            required
                            label="Descrição"
                            placeholder="Descrição do prato"
                            value={description}
                            onChange={event => setDesc(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline={true}
                            rowsMax="1"
                            required
                            label="Valor"
                            placeholder="Valor do prato"
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleNewMeal}>Cadastrar</Button>
                    </Grid>
                    
                    
                    </Grid>

            </Container>
        </>
    );
}
