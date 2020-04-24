import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import { TextField, Button, Container, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowLeft';
export default function Profile() {


    const history = useHistory();

    const [physical_client, setClient] = React.useState({});

    const [edit, setEdit] = React.useState({
        edit: false
    });

    const handleClickChangeEdit = () => {
        setEdit({ ...edit, edit: !edit.edit });
    };

    const physical_client_id = localStorage.getItem('physical_client_id');
    const physical_client_password = localStorage.getItem('physical_client_password');

    const saveButton = {
        height: '60px',
        width: '100px',
        textTransform: 'none',
        background: '#e02041',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '50px',
        transition: '0.3s',
        marginTop: '70%',
        display: 'flex',
        justifyContent: 'center'
    }
    function handleBackHome() {
        history.push('home-physical-client')
    }

    useEffect(() => {
        try {

            let res = physical_client.date_birth.substr(0, 10);
            setClient(Object.assign(physical_client, { date_birth: res }));
        } catch (err) { }
    }, [physical_client]);

    useEffect(() => {
        api.get('profile-physical-client', {
            headers: {
                Authorization: physical_client_id,
                Id: physical_client_id,
                Password: physical_client_password
            }
        }).then(response => {
            setClient(response.data[0]);
            handleClickChangeEdit();
        })
    }, [physical_client_id]);


    async function handleDeleteAccount() {
        let id = physical_client.pk_id_physical_client;

        try {
            api.delete('profile-physical-client', {
                headers: {
                    Authorization: id
                }
            });
            history.push('/');
            alert('Usuário deletado com sucesso.');
        } catch {
            alert('Erro ao deletar usuário');
        }
    }


    async function handleSaveButton() {
        const data = physical_client;
        try {
            await api.put('profile-physical-client', data);
            alert('Dados alterados com sucesso');
            history.push('/profile-physical-client')
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-physical-client')
        }
    }
    return (
        <>
            <Header profileType="profile-physical-client" name={physical_client.name} />
            <Container>
                <Grid container item direction="row">
                    <Grid container item direction="column" alignItems="center">
                        <Grid justifyContent="space-between">
                            <Link>
                                <IconButton
                                    onClick={handleClickChangeEdit}>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <Link to="/home-physical-client">
                                <IconButton>
                                    <BackIcon>
                                    </BackIcon>
                                </IconButton>
                            </Link>
                        </Grid>
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={physical_client.name}
                            onChange={(event) => {
                                const newObject = Object.assign({}, physical_client);
                                setClient(Object.assign(newObject, { name: event.target.value }));
                            }}
                        />
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={physical_client.cpf}
                            onChange={(event) => {
                                const newObject = Object.assign({}, physical_client);
                                setClient(Object.assign(newObject, { cpf: event.target.value }))
                            }}
                        />
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={physical_client.email}
                            onChange={(event) => {
                                const newObject = Object.assign({}, physical_client);
                                setClient(Object.assign(newObject, { email: event.target.value }))
                            }}
                        />
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={physical_client.date_birth}
                            onChange={(event) => {
                                const newObject = Object.assign({}, physical_client);
                                setClient(Object.assign(newObject, { date_birth: event.target.value }))
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveButton}>
                            Salvar
                    </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteAccount}>
                            Deletar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );

}