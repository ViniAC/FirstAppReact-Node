const connection = require('../database/connection')
const crypto = require('crypto');


module.exports = {

    async create(request, response) {
        const { cnpj, name, email, whatsapp, city, uf, password } = request.body;

        let verify_id = false;

        const pk_id_legal_client = crypto.randomBytes(4).toString('HEX');
        if(validateCNPJ(cnpj)){
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
function validateCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    let resultado;
    let i;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}