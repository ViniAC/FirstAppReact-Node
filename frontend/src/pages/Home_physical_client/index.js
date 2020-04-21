import React, { useEffect, useState, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { IoMdAdd, IoIosRemove } from 'react-icons/io'
import './styles.css';
import { useHistory } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import api from '../../services/api';
import { Container, Grid, Button } from '@material-ui/core';
import { ButtonStyle } from '../../assets/ButtonStyle'
import Header from '../../Header';
import Meal from './Meal';

export default function Home() {

    const history = useHistory();
    const physical_client_name = localStorage.getItem('physical_client_name');
    const physical_client_email = localStorage.getItem('physical_client_email')
    const physical_client_id = localStorage.getItem('physical_client_id');

    const [meals, setMeals] = useState([]);
    const [newSearch, setNewSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [btnMyOrder, setBtnOrder] = useState(false);

    const finishButton = {
        size: 'small',
        textTransform: 'none',
        height: 60,
        width: 200,
        background: '#e02041',
        border: 0,
        borderRadius: 8,
        color: '#FFF',
        fontWeight: 700,
        marginTop: 24,
        // display: 'inline-block',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '18px',
        lineHeight: '60px',
        transition: '0.3s',
        marginLeft: '82%'
    }

    const onNewSearchChange = useCallback((event) => {
        setSearchList([]);
        let newList = [];
        const copyOfList = meals.slice();
        for (let index = 0; index < copyOfList.length; index++) {
            if (copyOfList[index].name.includes(event.target.value)) {
                newList.push(copyOfList[index]);
            }
        }
        setSearchList(newList);
        setNewSearch(event.target.value);
    });


    async function handleMakeOrder() {
        if (btnMyOrder === false) {
            let listOrder = []
            for (let index = 0; index < meals.length; index++) {
                if (meals[index].qt > 0) {
                    listOrder.push({
                        mealId: meals[index].pk_id_meal,
                        qt: meals[index].qt
                    })
                }
            } if (listOrder.length !== 0) {
                const response = await api.post('get-order', listOrder);

                let data_order = response.data;

                console.log(data_order);

                try {
                    const response = await api.post('order', data_order, {
                        headers: {
                            Authorization: physical_client_id,
                        }
                    });
                    alert(response.data.message_success);
                    localStorage.setItem('id_order', response.data.pk_id_order);
                    console.log()
                    history.push('/order');
                } catch (err) {
                    alert('Erro ao fazer pedido.');
                }
            } else {
                alert('Insira pelo menos um item!');
            }
        } else {
            alert('Já tem um pedido em andamento!');
        }
    }

    useEffect(() => {
        api.get('home-physical-client', {
            headers: {
                Authorization: physical_client_email,
                physical_client_id: physical_client_id
            }
        }).then(response => {
            setMeals(response.data.meals);

            if (response.data.orders.length > 0) {
                setBtnOrder(true);
                localStorage.setItem('id_order', response.data.orders[0].pk_id_order);
            }

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

    function handleViewMyOrders() {
        history.push('/order');
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




    return (
        <>
            <Header profileType="profile-physical-client" name={physical_client_name} />
            <Container>

                <header>
                    <div>

                        {btnMyOrder !== false && (
                            <button onClick={() => handleViewMyOrders()} type="button">Visualizar meu pedido</button>
                        )}
                    </div>

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
                    <Grid xs={12} container direction="row" spacing="2">
                        {meals.map(meal => (
                            <Grid onClick={() => handleAddMeal(meal.pk_id_meal)} item xs={4} >

                                <Meal
                                    name={meal.name}
                                    description={meal.description}
                                    value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}
                                />
                            </Grid>
                        ))
                        }
                    </Grid>
                )}
                {newSearch != '' && (
                    <Grid xs={12} container direction="row" spacing="1">
                        {searchList.map(meal => (
                            <Grid onClick={() => handleAddMeal(meal.pk_id_meal)} item xs={4}>

                                <Meal
                                    name={meal.name}
                                    description={meal.description}
                                    value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}
                                />                       
                            </Grid>
                        ))
                        }
                    </Grid>
                )}
                <Button id='finish-order' style={ButtonStyle} onClick={() => handleMakeOrder()}>Finalizar pedido</Button>
            </Container>
        </>

    );
}