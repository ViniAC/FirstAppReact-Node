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
        if (validateCPF(cpf)) {
            if (cpf && name !== '' && email !== '' && date_birth !== '' && password !== '') {

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
        }
        return response.json({ verify_id });
    }
}
function validateCPF(cpf) {
    let add;
    let i;
    let rev;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}