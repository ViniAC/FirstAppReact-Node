import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '@material-ui/core/Button'

export default function Home() {

    const [meal, setMeal] = useState([]);

    const [edit, setEdit] = useState(true);

    const history = useHistory();
    const meal_id = localStorage.getItem('meal_id');
    const legal_client_name = localStorage.getItem('legal_client_name');

    const saveButton = {
        height: '60px',
        width: '100px', 
        textTransform: 'none', 
        background: '#e02041',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '50px',
        transition:  '0.3s',
        // marginLeft: '82%',
        // marginTop: '100%'
        }

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

    function handleLogout() {

        localStorage.clear();
        history.push('/');
    }

    async function handleBackHome() {

        history.push('home-legal-client');
    }


    return (
        <div className="home-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />

                <span>Bem vindo(a), {legal_client_name}. </span>

                <Link className="button" to="/meal/new">Cadastrar novo Prato</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

                <button onClick={handleBackHome} type="button" id="btn_my_profile">
                    <FiArrowLeft size={18} color="#E02041" />
                </button>
            </header>
            <h1>Pratos Cadastrados</h1>
            <ul>
                <form>
                <li key={meal.pk_id_meal}>
                        <strong>PRATO:</strong>
                        <input
                            enabled={edit}
                            defaultValue={meal.name}
                            onChange={(event) => {
                                setMeal(Object.assign(meal, { name: event.target.value }))
                            }}
                        />

                        <strong>Descrição:</strong>
                        <input
                            enabled={edit}
                            defaultValue={meal.description}
                            onChange={(event) => {
                                setMeal(Object.assign(meal, { description: event.target.value }))
                            }}
                        />

                        <strong>VALOR:</strong>
                        <input
                            enabled={edit}
                            defaultValue={meal.value}
                            onChange={(event) => {
                                setMeal(Object.assign(meal, { value: event.target.value }))
                            }}
                        />

                    </li>
                    <Button style={saveButton} onClick={handleSaveButton} id='save'>Salvar</Button>
                </form>
            </ul>
        </div>

    );
}