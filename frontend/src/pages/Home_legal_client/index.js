import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2, FiEdit2, FiUser } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

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
        <div className="home-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />

                <span>Bem vindo(a), {legal_client_name}. </span>

                <Link className="button" to="/meals/new">Cadastrar novo Prato</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

                <button onClick={handleMyProfile} type="button" id="btn_my_profile">
                    <FiUser size={18} color="#E02041" />
                </button>
            </header>
            <h1>Pratos Cadastrados</h1>
            <ul>
                {meals.map(meal => (
                    <li key={meal.pk_id_meal}>
                        <strong>PRATO:</strong>
                    
                        <p>{meal.name}</p>

                        <strong>Descrição:</strong>
                        <p>{meal.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}</p>

                        <button id="btn_delete" onClick={() => handleDeleteMeal(meal.pk_id_meal)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button id="btn_edit" onClick={() => handleEditMeal(meal.pk_id_meal)} type="button">
                            <FiEdit2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
}