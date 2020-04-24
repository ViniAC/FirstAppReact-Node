import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2, FiEdit2, FiUser } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../Components/Header';
import Meal from '../Components/Meal';
import { Container, Grid, Button } from '@material-ui/core';

export default function Home() {

    const [meals, setMeals] = useState([]);

    const [edit, setEdit] = useState(true);

    const history = useHistory();
    const legal_client_id = localStorage.getItem('legal_client_id');
    const legal_client_name = localStorage.getItem('legal_client_name');

    useEffect(() => {
        api.get('home-legal-client', {
            headers: {
                Authorization: legal_client_id,
            }
        }).then(response => {
            setMeals(response.data);
        })
    }, [legal_client_id]);

    async function handleDeleteMeal(pk_id_meal) {
        try {
            await api.delete(`meals/${pk_id_meal}`, {
                headers: {
                    Authorization: legal_client_id,
                }
            });

            setMeals(meals.filter(meal => meal.pk_id_meal !== pk_id_meal));

        } catch (err) {
            alert('Erro ao deletar prato, tente novamente.')
        }
    }

    function handleLogout() {

        localStorage.clear();
        history.push('/');
    }

    async function handleMyProfile() {

        history.push('profile-legal-client');
    }

    function handleEditMeal(pk_id_meal) {
        localStorage.setItem('meal_id', pk_id_meal);
        history.push('edit-meal-legal-client')
    }

    return (
        <>
            <Header profileType="profile-legal-client" name={legal_client_name} />
            <Container>

                <header>

                    <div>
                        <Link className="button" to="/meals/new">Cadastrar novo Prato</Link>

                    </div>

                </header>
                <h1>Pratos Cadastrados</h1>


                <Grid xs={12} container item direction="row" spacing={2}>
                    {meals.map(meal => (
                        <Grid key={meal.name}
                            item xs={12} sm={6} md={4} >

                            <Meal
                                name={meal.name}
                                description={meal.description}
                                quantity={meal.qt}
                                value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}
                            />
                            <Button onClick={() => handleDeleteMeal(meal.pk_id_meal)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </Button>
                            <Button onClick={() => handleEditMeal(meal.pk_id_meal)} type="button">
                                <FiEdit2 size={20} color="#a8a8b3" />
                            </Button>

                        </Grid>

                    ))}
                </Grid>
            </Container>
        </>

    );
}