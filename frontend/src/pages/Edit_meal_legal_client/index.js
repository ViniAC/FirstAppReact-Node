import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
//import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Button, Container, TextField, Grid, Typography } from '@material-ui/core/'
import Header from '../Components/Header';

export default function Home() {

    const [meal, setMeal] = useState([]);

    const [edit, setEdit] = useState(true);

    const history = useHistory();
    const meal_id = localStorage.getItem('meal_id');
    const legal_client_name = localStorage.getItem('legal_client_name');

    useEffect(() => {
        console.log('teste');
        api.get('meals', {
            headers: {
                Authorization: meal_id,
            }
        }).then(response => {
            setMeal(response.data[0]);
            console.log(response.data);

        })
    }, [meal_id]);



    function handleSaveButton() {
        const data = meal;
        try {

            console.log(data);
            api.put('meals', data)

                .then(response => {
                    console.log(response.data);
                })
            alert('Dados alterados com sucesso');
            history.push('home-legal-client');
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/edit-meal-legal-client')
        }
    }



    async function handleBackHome() {

        history.push('home-legal-client');
    }


    return (
        <>
            <Header profileType="profile-legal-client" name={legal_client_name} />
            <Container>
                <Button style={{color: "#3f51b5", marginTop:"10px"}}  onClick={handleBackHome}>


                    <Link ><FiArrowLeft style={{marginRight:"5px"}} size={18} color="#3f51b5" />
                        
                    </Link>
                    <Typography>Voltar</Typography>


                </Button>


                <Grid key={meal.pk_id_meal} container item direction="column" justify="center" alignItems="center">
                    <Typography style={{ fontSize: "40px" }}>Editar prato</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline={true}
                        label="Nome"
                        rowsMax="3"
                        enabled={edit}
                        defaultValue={meal.name}
                        onChange={(event) => {
                            setMeal(Object.assign(meal, { name: event.target.value }))
                        }}
                    />


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        rowsMax="10"
                        label="Descrição"
                        multiline={true}
                        enabled={edit}
                        defaultValue={meal.description}
                        onChange={(event) => {
                            setMeal(Object.assign(meal, { description: event.target.value }))
                        }}
                    />


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline={true}
                        rowsMax="1"
                        label="Valor"
                        enabled={edit}
                        defaultValue={meal.value}
                        onChange={(event) => {
                            setMeal(Object.assign(meal, { value: event.target.value }))
                        }}
                    />
                    <Button color="primary" variant="contained" onClick={handleSaveButton} >Salvar</Button>
                </Grid>



            </Container>
        </>
    );
}