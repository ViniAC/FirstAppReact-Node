const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        const physical_client = await connection('tb_physical_client')
            .where('email', email)
            .and
            .where('password', password)
            .select('pk_id_physical_client', 'name')
            .first();

        if (!physical_client) {
            return response.status(400).json({ error: 'No phisycal client found with this ID.' })
        }
        return response.json(physical_client);
    }
}