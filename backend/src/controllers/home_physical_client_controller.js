const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const meals = await connection('tb_meal')
            .select('*');
        return response.json(meals);
    }
}