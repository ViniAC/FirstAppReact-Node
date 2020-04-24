import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import { Container, Grid, Button, TextField, FormGroup, ButtonGroup } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowLeft';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
    }
}))
export default function Profile() {

    const classes = useStyles();
    const history = useHistory();

    const [legal_client, setClient] = useState([]);

    const [edit, setEdit] = React.useState({
        edit: true
    });

    const handleClickChangeEdit = () => {
        setEdit({ ...edit, edit: !edit.edit });
    };
    const legal_client_id = localStorage.getItem('legal_client_id');



    function handleBackHome() {
        history.push('home-legal-client')
    }

    useEffect(() => {
        api.get('profile-legal-client', {
            headers: {
                Authorization: legal_client_id,
            }
        }).then(response => {
            setClient(response.data[0]);
        })
    }, [legal_client_id]);

    async function handleDeleteAccount() {
        let id = legal_client.pk_id_legal_client;

        try {
            api.delete('profile-legal-client', {
                headers: {
                    authorization: id
                }
            });
            alert('Usuário deletado com sucesso.');
            history.push('/');
        } catch {
            alert('Erroao deletar usuário.');
        }
    }

    async function handleSaveButton() {
        const data = legal_client;
        try {
            console.log(data);
            await api.put('profile-legal-client', data);
            alert('Dados alterados com sucesso');
            history.push('/profile-legal-client')
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-legal-client')
        }
    }



    return (
        <>
            <Header profileType="profile-legal-client" name={legal_client.name} />
            <Container >
                <Grid container item direction="row">

                    <Grid container item direction="column" alignItems="center">
                        <Grid justifyContent="space-between">
                            <Link>
                                <IconButton
                                    onClick={handleClickChangeEdit}>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <Link to="/home-legal-client">
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
                            value={legal_client.name}
                            onChange={(event) => {
                                const newObject = Object.assign({}, legal_client);
                                setClient(Object.assign(newObject, { name: event.target.value }));
                            }}
                        />

                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={legal_client.cnpj}
                            onChange={(event) => {
                                const newObject = Object.assign({}, legal_client);
                                setClient(Object.assign(newObject, { cnpj: event.target.value }));
                            }}
                        />
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={legal_client.email}
                            onChange={(event) => {
                                const newObject = Object.assign({}, legal_client);
                                setClient(Object.assign(newObject, { email: event.target.value }));
                            }}
                        />
                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={legal_client.city}
                            onChange={(event) => {
                                const newObject = Object.assign({}, legal_client);
                                setClient(Object.assign(newObject, { city: event.target.value }));
                            }}
                        />

                        <TextField
                            margin="normal"
                            disabled={edit.edit}
                            variant="outlined"
                            value={legal_client.uf}
                            onChange={(event) => {
                                const newObject = Object.assign({}, legal_client);
                                setClient(Object.assign(newObject, { uf: event.target.value }));
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