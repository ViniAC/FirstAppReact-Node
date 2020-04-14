import React, { useEffect, useState, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiUser } from 'react-icons/fi';
import { IoMdAdd, IoIosRemove } from 'react-icons/io'
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Home() {

    const [meals, setMeals] = useState([]);
    const [displayQt, setDisplayQt] = useState(true);


    const history = useHistory();
    const physical_client_name = localStorage.getItem('physical_client_name');
    const physical_client_email = localStorage.getItem('physical_client_email')
    const physical_client_id = localStorage.getItem('physical_client_id');


    //Search for meals, update each key pressed
    const [newSearch, setNewSearch] = useState('');
    const [searchList, setSearchList] = useState([]);

    const onNewSearchChange = useCallback((event) => {
        setSearchList([]);
        let newList = [];
        const copyOfList = meals.slice();
        for (let index = 0; index < copyOfList.length; index++) {
            if (copyOfList[index].name.includes(event.target.value)){
                newList.push(copyOfList[index]);
            }
        }
        setSearchList(newList);
        setNewSearch(event.target.value);
    });


    async function handleMakeOrder() {
        let listOrder = []
        for (let index = 0; index < meals.length; index++) {
            if (meals[index].qt > 0){
                listOrder.push({
                    mealId: meals[index].pk_id_meal,
                    qt: meals[index].qt
                })
            }
        }
        const response = await api.post('get-order', listOrder);

        let data_order = response.data;

        console.log(data_order);

        try {
            const response = await api.post('order', data_order, {
                headers: {
                    Authorization: physical_client_id,
                }
            });
            alert(`Pedido realizado com sucesso`);
            console.log(response)
        } catch (err) {
            alert('Erro ao fazer pedido.');
        }
    }

    useEffect(() => {
        api.get('home-physical-client', {
            headers: {
                Authorization: physical_client_email,
            }
        }).then(response => {
            setMeals(response.data);

        })
    }, [physical_client_email]);



    function handleRemoveMeal(mealId) {
        let copyOfList = meals.slice()
        for (let index = 0; index < copyOfList.length; index++) {
            if (mealId === copyOfList[index].pk_id_meal) {
                if (copyOfList[index].qt <= 1) {
                    copyOfList[index].qt = 0;
                    setMeals(copyOfList);
                    return
                }
                copyOfList[index].qt--
            }
        }
        setMeals(copyOfList);
    }

    async function handleAddMeal(mealId) {
        let copyOfList = meals.slice()
        for (let index = 0; index < copyOfList.length; index++) {
            if (mealId === copyOfList[index].pk_id_meal) {
                let newValue = (copyOfList[index].qt += 1);
                if (isNaN(newValue)) {
                    newValue = 1;
                }
                Object.assign(copyOfList[index], { qt: newValue });
                setMeals(copyOfList);
            }
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function handleMyProfile() {
        history.push('profile-physical-client');
    }

    return (
        <div className="home-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />

                <span>Bem vindo(a), {physical_client_name}. </span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

                <button onClick={handleMyProfile} type="button" id="btn_my_profile">
                    <FiUser size={18} color="#E02041" />
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
            {newSearch == '' && (
                <ul >
                    {meals.map(meal => (
                        <li key={meal.pk_id_meal}>
                            <strong>PRATO:</strong>
                            <p>{meal.name}</p>

                            <strong>Descrição:</strong>
                            <p>{meal.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}</p>

                            <button onClick={() => handleAddMeal(meal.pk_id_meal)} type="button">
                                <IoMdAdd size={20} color="gray" />
                            </button>

                            <button id="btn_remove_meal" onClick={() => handleRemoveMeal(meal.pk_id_meal)} type="button">
                                <IoIosRemove size={20} color="gray" />
                            </button>

                            {displayQt && (
                                <strong> Quantidade: {meal.qt} </strong>
                            )}

                        </li>
                    ))
                    }
                </ul>
            )}
            {newSearch != '' && (
                <ul >
                    {searchList.map(meal => (
                        <li key={meal.pk_id_meal}>
                            <strong>PRATO:</strong>
                            <p>{meal.name}</p>

                            <strong>Descrição:</strong>
                            <p>{meal.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}</p>

                            <button onClick={() => handleAddMeal(meal.pk_id_meal)} type="button">
                                <IoMdAdd size={20} color="gray" />
                            </button>

                            <button id="btn_remove_meal" onClick={() => handleRemoveMeal(meal.pk_id_meal)} type="button">
                                <IoIosRemove size={20} color="gray" />
                            </button>

                            {displayQt && (
                                <strong> Quantidade: {meal.qt} </strong>
                            )}

                        </li>
                    ))
                    }
                </ul>
            )}
            <button id='finish-order' onClick={() => handleMakeOrder()}>Finalizar pedido</button>
        </div >

    );
}