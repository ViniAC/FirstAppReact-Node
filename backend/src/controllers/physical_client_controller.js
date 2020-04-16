const connection = require('../database/connection');

module.exports = {


    //Lista os clientes físicos
    async index(request, response) {
        const users = await connection('tb_physical_client').select('*');
        return response.json(users);
    },

    //Cadastra os clientes físicos
    async create(request, response) {
        const { cpf, name, email, date_birth, password } = request.body;

        let verify_id = false;

        const response_success = 'Usuário criado com sucesso!';

        if (cpf !== '' && name !== '' && email !== '' && date_birth !== '' && password !== '') {

            await connection('tb_physical_client').insert({
                cpf,
                name,
                email,
                date_birth,
                password,
            })
            verify_id = true;
            return response.json({ response_success, verify_id });
        }
        return response.json({ verify_id });
    }
}