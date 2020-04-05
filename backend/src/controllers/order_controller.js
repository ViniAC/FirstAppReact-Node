const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { description, price, fk_id_legal_client, fk_id_physical_client, fk_id_meal } = request.body;



        /* 
                fk_id_legal_client = alguma_coisa k k k 
                fk_id_physical_client = alguma_coisa k k k 
                fk_id_meal = alguma_coisa k k k  */

        var dateOldFormat = new Date();
        var date = dateOldFormat.toString();


        const [pk_id_order] = await connection('tb_order').insert({
            description,
            price,
            date,
            fk_id_legal_client,
            fk_id_physical_client,
            fk_id_meal
        })

        return response.json('Success! ID do maluco: ' + pk_id_order);
    },

    async index(request, response) {
        const orders = await connection('tb_order').select('*');
        return response.json(orders);
    },
}

