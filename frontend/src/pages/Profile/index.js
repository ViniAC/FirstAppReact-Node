import React, { useEffect, useState, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { IoMdAdd, IoIosRemove } from 'react-icons/io'
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Profile() {

    const [meals, setMeals] = useState([]);
    const [listOrder, setListOrder] = useState([]);

    const history = useHistory();
    const physical_client_name = localStorage.getItem('physical_client_name');
    const physical_client_email = localStorage.getItem('physical_client_email')

    //Search for meals, update each key pressed
    const [newSearch, setNewSearch] = useState('');
    const onNewSearchChange = useCallback((event) => {
        setNewSearch(event.target.value);
    },);
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: physical_client_email,
            }
        }).then(response => {
            setMeals(response.data);

        })
    }, [physical_client_email]);

    function handleRemoveMeal(mealId) {
        setListOrder(listOrder.filter(otherMeal => otherMeal !== mealId));
    }

    function handleAddMeal(mealId) {
        let isInList = false;
        for (let index = 0; index < listOrder.length; index++) {
            if(mealId == listOrder[index]){
                isInList = true;
            }
        }   
        if (!isInList){
         setListOrder([
            ...listOrder,
            mealId
        ]);
        }
    }
    
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />

                <span>Bem vindo(a), {physical_client_name}. </span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <form>
                <input
                    placeholder="Nome do prato"
                    value={newSearch}
                    onChange={onNewSearchChange}
                />
            </form>
            <h1>Pratos:</h1>
            <ul >
                {meals.map(meal => (
                    <li key={meal.pk_id_meal}>
                        <strong>PRATO:</strong>
                        <p>{meal.name}</p>

                        <strong>Descrição:</strong>
                        <p>{meal.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}</p>

                        <button  onClick={() => handleAddMeal(meal.pk_id_meal)} type="button">
                            <IoMdAdd size={20} color="gray" />
                        </button>

                        <button id="btn_remove_meal" onClick={() => handleRemoveMeal(meal.pk_id_meal)} type="button">
                            <IoIosRemove size={20} color="gray" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
}