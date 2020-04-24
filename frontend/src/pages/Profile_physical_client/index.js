import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FaRegEdit } from 'react-icons/fa'
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import Header from '../Components/Header';
import { TextField, Button } from '@material-ui/core';
import UserForm from '../Components/UserForm';

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
        marginTop: '70%',
        display: 'flex',
        justifyContent: 'center'
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
            history.push('/profile-physical-client')
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-physical-client')
        }
    }

    return (
        <UserForm physical_client={physical_client}/>
    );

}