const Content = require ('../models/Content');

module.exports = {

    async createContent (request, response) {

        const data = request.body;

        try {
            await Content.create(data);

            return response.json(data);
        } catch (err) {
            console.log(err)
            return response.status(400).json({"Error" : "Erro register the data"})
        }
    },

    async listContent (request, response) {

        let dados = await Content.find();

        console.log(dados[0].title)

        return response.json(dados);
    }
}