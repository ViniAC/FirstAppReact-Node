import React from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />


                    <h1>Cadastro Cliente Jurídico</h1>
                    <p>Faça seu cadastro, entre na plataforma e facilite a vida dos seus clientes!</p>

                    <Link className="back-link" to="/logon-legal-client">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para tela de Logon
                    </Link>
                </section>
                <form>
                    <input 
                        placeholder="CNPJ" 
                        maxLength="14" 
                    />
                    <input 
                        placeholder="Nome" 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                    />
                    <input 
                        placeholder="WhatsApp" 
                    />

                    <div className="input-group">
                        <input placeholder="Cidade" />
                        <input placeholder="UF" style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
