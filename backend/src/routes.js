const express = require('express');
const routes = express.Router();

const physical_client_controller = require('./controllers/physical_client_controller');
const home_physical_client_controller = require('./controllers/home_physical_client_controller');
const session_physical_client_controller = require('./controllers/session_physical_client_controller');
const profile_physical_client_controller = require('./controllers/profile_physical_client_controller')


const legal_client_controller = require('./controllers/legal_client_controller');
const home_legal_clients_controller = require('./controllers/home_legal_client_controller');
const session_legal_client_controller = require('./controllers/session_legal_client_controller');
const profile_legal_client_controller = require('./controllers/profile_legal_client_controller')


const meal_controller = require('./controllers/meal_controller');


const order_controller = require('./controllers/order_controller');


routes.post('/users', physical_client_controller.create);
routes.get('/users', physical_client_controller.index);
//routes.delete('/users/:id', physical_client_controller.delete);

routes.post('/companies', legal_client_controller.create);
routes.get('/companies', legal_client_controller.index);
//routes.('/companies/:id', legal_client_controller.delete);



routes.get('/meals', meal_controller.index);
routes.post('/meals', meal_controller.create);
routes.delete('/meals/:pk_id_meal', meal_controller.delete);


routes.get('/home-physical-client', home_physical_client_controller.index);
routes.post('/session-physical-client', session_physical_client_controller.create);
routes.get('/profile-physical-client', profile_physical_client_controller.index);
routes.put('/profile-physical-client', profile_physical_client_controller.update);

routes.get('/home-legal-client', home_legal_clients_controller.index);
routes.post('/session-legal-client', session_legal_client_controller.create);
routes.get('/profile-legal-client', profile_legal_client_controller.index);
routes.put('/profile-legal-client', profile_legal_client_controller.update);


routes.post('/order', order_controller.create);
routes.get('/order', order_controller.index);



module.exports = routes;