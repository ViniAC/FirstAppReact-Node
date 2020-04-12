import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa'

export default function Profile() {

    const history = useHistory();

    const [legal_client, setClient] = useState([]);

    const [edit, setEdit] = useState(true);

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

    async function handleSaveButton() {
        const data = legal_client;
        try {
            console.log(data);
            await api.put('profile-legal-client', data);
            alert('Dados alterados com sucesso');
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-legal-client')
        }
    }



    return (
        <div className="home-container">
            <header>

                <span>Olá, {legal_client.name}. </span>

                <button onClick={handleBackHome} type="button">
                    <FiArrowLeft size={18} color="#E02041" />
                </button>


            </header>
            <h1>Seus dados: </h1>
            <ul>
                <form>
                    <li key={legal_client.pk_id_legal_client}>
                        <strong>Nome da Empresa:</strong>
                        <input
                            disabled={edit}
                            defaultValue={legal_client.name}
                            onChange={(event) => {
                                setClient(Object.assign(legal_client, { name: event.target.value }))
                            }}
                        />

                        <strong>CNPJ:</strong>

                        <input
                            disabled={edit}
                            defaultValue={legal_client.cnpj}
                            onChange={(event) => {
                                setClient(Object.assign(legal_client, { cnpj: event.target.value }))
                            }}
                        />

                        <strong>E-Mail:</strong>
                        <input
                            disabled={edit}
                            defaultValue={legal_client.email}
                            onChange={(event) => {
                                setClient(Object.assign(legal_client, { newEmail: event.target.value }))
                            }}
                        />

                        <strong>Cidade:</strong>
                        <input
                            disabled={edit}
                            defaultValue={legal_client.city}
                            onChange={(event) => {
                                setClient(Object.assign(legal_client, { city: event.target.value }))
                            }}
                        />
                        <strong>UF:</strong>
                        <input
                            disabled={edit}
                            defaultValue={legal_client.uf}
                            onChange={(event) => {
                                setClient(Object.assign(legal_client, { uf: event.target.value }))
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => setEdit(!edit)}>
                            <FaRegEdit size={20} color="gray" />
                        </button>
                        <button onClick={handleSaveButton} id='save'>Salvar</button>
                    </li>
                </form>
            </ul>
        </div>

    );

}