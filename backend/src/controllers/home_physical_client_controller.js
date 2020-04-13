const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query;

        const [count] = await connection('tb_meal').count('pk_id_meal');

        const meals = await connection('tb_meal')
            .select('*');

        response.header('X-Total-Count', count['count(`pk_id_meal`)']);

        return response.json(meals);
    }
}