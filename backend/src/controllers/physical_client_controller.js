const connection = require('../database/connection');

module.exports = {

    //Teste do método UPDATE
    /*     async update(request, response) {
        const update_user = await connection('tb_physical_client').where({ pk_id_physical_client: 3 })
            .update({ name: "Victor", cpf: "98765432100", email: "victor@gmail.com", date_birth: "03/04/1995" });
        return response.json(update_user);
    }, */


    //Lista os clientes físicos
    async index(request, response) {
        const users = await connection('tb_physical_client').select('*');
        return response.json(users);
    },

    //Cadastra os clientes físicos
    async create(request, response) {
        const { cpf, name, email, date_birth, password } = request.body;

        await connection('tb_physical_client').insert({
            cpf,
            name,
            email,
            date_birth,
            password,
        })

        return response.json('Physical client created!');
    }
}