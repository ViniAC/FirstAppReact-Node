const connection = require('../database/connection')
const crypto = require('crypto');


module.exports = {

    async create(request, response) {
        const { cnpj, name, email, whatsapp, city, uf, password } = request.body;

        let verify_id = false;

        const pk_id_legal_client = crypto.randomBytes(4).toString('HEX');

        if (cnpj !== '' && name !== '' && email !== '' && whatsapp !== '' && city !== '' && uf !== '' && password !== '') {

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


            sendCodeWhatsApp(pk_id_legal_client, whatsapp);
            verify_id = true;
            return response.json({ pk_id_legal_client, verify_id });
        }
        return response.json({ verify_id });
    },

    async index(request, response) {
        const companies = await connection('tb_legal_client').select('*');
        return response.json(companies);
    },

    async delete(request, response) {
        const { pk_id_legal_client } = request.params;
    }
}

function sendCodeWhatsApp(pk_id_legal_client, whatsapp) {

    require('dotenv/config');

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: 'Seu ID de acesso é: ' + pk_id_legal_client,
            to: 'whatsapp:+5581' + whatsapp
        })
        .then(message => console.log(message.sid));
}