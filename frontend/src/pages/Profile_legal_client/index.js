import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa'
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';
import CompanieForm from '../Components/CompanieForm';

export default function Profile() {

    const history = useHistory();

    const [legal_client, setClient] = useState([]);

    const [edit, setEdit] = useState(true);

    const legal_client_id = localStorage.getItem('legal_client_id');

    const saveButton = {
        height: '60px',
        width: '100px',
        textTransform: 'none',
        background: '#e02041',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '50px',
        transition: '0.3s',
        // marginLeft: '82%',
        // marginTop: '100%'
    }


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

    async function handleDeleteAccount() {
        let id = legal_client.pk_id_legal_client;

        try {
            api.delete('profile-legal-client', {
                headers: {
                    authorization: id
                }
            });
            alert('Usuário deletado com sucesso.');
            history.push('/');
        } catch {
            alert('Erroao deletar usuário.');
        }
    }

    async function handleSaveButton() {
        const data = legal_client;
        try {
            console.log(data);
            await api.put('profile-legal-client', data);
            alert('Dados alterados com sucesso');
            history.push('/profile-legal-client')
        } catch (err) {
            alert('Erro ao alterar dados');
            history.push('/profile-legal-client')
        }
    }



    return (
        <CompanieForm legal_client={legal_client} />
    );

}