import React, { useState } from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import Button from '@material-ui/core/Button';
import { ButtonStyle } from '../../assets/ButtonStyle'

export default function NewMeal() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [value, setValue] = useState('');

    const fk_id_legal_client = localStorage.getItem('legal_client_id');

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

    return (
        <div className="new-meal-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />


                    <h1>Cadastro de novos pratos</h1>
                    <p>Cadastre pratos deliciosos!</p>

                    <Link className="back-link" to="/home-legal-client">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
                </section>

                <form onSubmit={handleNewMeal}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDesc(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <Button className="button" style={ButtonStyle} type="submit">Cadastrar</Button>

                </form>
            </div>
        </div>
    );
}
