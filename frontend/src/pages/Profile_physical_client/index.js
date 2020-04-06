import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa'
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function Profile() {


    const history = useHistory();

    const [physical_client, setClient] = useState([]);

    const [edit, setEdit] = useState(true);

    const physical_client_id = localStorage.getItem('physical_client_id');


    function handleBackHome() {
        history.push('home-physical-client')
    }


    useEffect(() => {
        api.get('profile-physical-client', {
            headers: {
                Authorization: physical_client_id,
            }
        }).then(response => {
            setClient(response.data[0]);
        })
    }, [physical_client_id]);

    async function handleSaveButton() {
        const data = physical_client;
        try {
            console.log(data);
            await api.put('profile-physical-client', data);
            alert('Dados alterados com sucesso');
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-physical-client')
        }
    }

    return (
        <div className="home-container">
            <header>

                <span>Olá, {physical_client.name}. </span>

                <button onClick={handleBackHome} type="button">
                    <FiArrowLeft size={18} color="#E02041" />
                </button>


            </header>
            <h1>Seus dados: </h1>
            <ul>
                <form>
                <li key={physical_client.pk_id_physical_client}>
                    <strong>Nome:</strong>
                    <input 
                        disabled={edit}
                        defaultValue={physical_client.name}
                        onChange={(event) => {
                            setClient(Object.assign(physical_client, {name: event.target.value}))
                        }}
                    />

                    <strong>CPF:</strong>

                    <input 
                        disabled={edit}
                        defaultValue={physical_client.cpf}
                        onChange={(event) => {
                            setClient(Object.assign(physical_client, {cpf: event.target.value}))
                        }}
                    />

                    <strong>E-Mail:</strong>
                    <input 
                        disabled={edit}
                        defaultValue={physical_client.email}
                        onChange={(event) => {
                            setClient(Object.assign(physical_client, {newEmail: event.target.value}))
                        }}
                    />

                    <strong>Data de Nascimento:</strong>
                    <p>{physical_client.date_birth}</p>

                    <button 
                        type="button"
                        onClick={() => setEdit(!edit)}>
                        <FaRegEdit size={20} color="gray" />
                    </button>
                    <button onClick={handleSaveButton}id='save'>Salvar</button>
                </li>
                </form>
            </ul>
        </div>

    );

}