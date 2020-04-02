const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async create(request, response) {
        const { cnpj, name, email, whatsapp, city, uf, password } = request.body;

        const pk_id_legal_client = crypto.randomBytes(4).toString('HEX');

        await connection('tb_legal_client').insert({
            pk_id_legal_client,
            cnpj,
            name,
            email,
            whatsapp,
            city,
            uf,
            password,
        })
        return response.json({ pk_id_legal_client });
    },

    async index(request, response) {
        const companies = await connection('tb_legal_client').select('*');
        return response.json(companies);
    },

    async delete(request, response) {
        const { pk_id_legal_client } = request.params;
    }
}