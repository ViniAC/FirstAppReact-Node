const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query;
        const status_in_progress = 'em_andamento';
        const fk_id_physical_client = request.headers.physical_client_id;

        const [count] = await connection('tb_meal').count('pk_id_meal');

        const meals = await connection('tb_meal')
            .select('*');

        const orders = await connection('tb_order')
            .where('fk_id_physical_client', fk_id_physical_client)
            .and
            .where('status', status_in_progress)
            .select('pk_id_order')

        response.header('X-Total-Count', count['count(`pk_id_meal`)']);

        return response.json({ meals, orders });
    }
}