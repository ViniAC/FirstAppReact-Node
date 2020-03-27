const express = require('express');
const routes = express.Router();
const physical_client_controller = require('./controllers/physical_client_controller');
const legal_client_controller = require('./controllers/legal_client_controller');
const meal_controller = require('./controllers/meal_controller');
const profile_controller = require('./controllers/profile_controller');
const session_controller = require('./controllers/session_controller');

//Cadastra clientes físicos
routes.post('/users', physical_client_controller.create);
//Lista clientes físicos
routes.get('/users', physical_client_controller.index);
//Deleta clientes físicos
//routes.delete('/users/:id', physical_client_controller.delete);

//Cadastra  clientes jurídicos
routes.post('/companies', legal_client_controller.create);
//Lista clientes jurídicos
routes.get('/companies', legal_client_controller.index);
//Deleta clientes jurídicos
//routes.get('/companies/:id', legal_client_controller.delete);


//Lista refeições
routes.get('/meals', meal_controller.index);
//Cadastra refeições
routes.post('/meals', meal_controller.create);
//Deleta refeições 
routes.delete('/meals/:pk_id_meal', meal_controller.delete);

//Lista pratos apenas de uma empresa
routes.get('/profile', profile_controller.index);


routes.get('/sessions', session_controller.create);


module.exports = routes;