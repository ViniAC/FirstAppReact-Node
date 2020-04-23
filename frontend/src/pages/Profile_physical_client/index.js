import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FaRegEdit } from 'react-icons/fa'
import './styles.css';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';

export default function Profile() {


    const history = useHistory();

    const [physical_client, setClient] = useState([]);

    const [edit, setEdit] = useState(true);

    const physical_client_id = localStorage.getItem('physical_client_id');
    const physical_client_password = localStorage.getItem('physical_client_password');

    const saveButton = {
        height: '60px',
        width: '100px',
        textTransform: 'none',
        background: '#e02041',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '50px',
        transition: '0.3s',
        marginLeft: '82%',
        marginTop: '70%'
    }
    function handleBackHome() {
        history.push('home-physical-client')
    }

    useEffect(() => {
        try {

            setEdit(false);
            let res = physical_client.date_birth.substr(0, 10);
            setClient(Object.assign(physical_client, { date_birth: res }));
            setEdit(true);

        } catch (err) { }
    }, [physical_client]);

    useEffect(() => {
        api.get('profile-physical-client', {
            headers: {
                Authorization: physical_client_id,
                Id: physical_client_id,
                Password: physical_client_password
            }
        }).then(response => {
            setClient(response.data[0]);
        })
    }, [physical_client_id]);


    async function handleDeleteAccount() {
        let id = physical_client.pk_id_physical_client;

        try {
            api.delete('profile-physical-client', {
                headers: {
                    Authorization: id
                }
            });
            history.push('/');
            alert('Usuário deletado com sucesso.');
        } catch {
            alert('Erro ao deletar usuário');
        }
    }


    async function handleSaveButton() {
        const data = physical_client;
        try {
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
                <div>
                    <img src={logoImg} alt="Be The Hero" />
                    <span>Olá, {physical_client.name}. </span>
                </div>
                <div>
                    <button onClick={handleBackHome} type="button">
                        <FiArrowLeft size={18} color="#E02041" />
                    </button>
                </div>

            </header>
            <h1>Seus dados: </h1>
            <ul>
                <form>
                    <li>
                        <strong>Nome:</strong>
                        <input
                            disabled={edit}
                            defaultValue={physical_client.name}
                            onChange={(event) => {
                                setClient(Object.assign(physical_client, { name: event.target.value }))
                            }}
                        />

                        <strong>CPF:</strong>

                        <input
                            disabled={edit}
                            defaultValue={physical_client.cpf}
                            onChange={(event) => {
                                setClient(Object.assign(physical_client, { cpf: event.target.value }))
                            }}
                        />

                        <strong>E-Mail:</strong>
                        <input
                            disabled={edit}
                            defaultValue={physical_client.email}
                            onChange={(event) => {
                                setClient(Object.assign(physical_client, { newEmail: event.target.value }))
                            }}
                        />

                        <strong>Data de Nascimento:</strong>
                        <p>{physical_client.date_birth}</p>
                        <button
                            id='delete'
                            type="button"
                            onClick={handleDeleteAccount}>
                            <FiTrash2 size={20} color="gray" />
                        </button>
                        <button 
                            type="button"
                            onClick={() => setEdit(!edit)}>
                            <FaRegEdit size={20} color="gray" />
                        </button>
                        {/* <Button style={saveButton} onClick={handleSaveButton} id='save'>Salvar</Button> */}
                    </li>
                    <Button style={saveButton} onClick={handleSaveButton} id='save'>Salvar</Button>
                </form>
            </ul>
        </div>

    );

}