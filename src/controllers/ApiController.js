const Action = require('../models/Action')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');

module.exports = {
    
  async fulfillmentText(request, response){
    var intentName = request.body.queryResult.intent.displayName;

    if (intentName === 'onboarding.aluno') {

    response.json({
      "fulfillmentMessages" : [
        {
          "text": {
            "text": [
              "Deseja salvar seus dados?"
            ]
          }
        },
      ]
    });

    } else if (intentName === 'onboarding.aluno-yes') {

      var aluno_nome = request.body.queryResult.parameters['aluno-nome'];
      var aluno_curso = request.body.queryResult.parameters['aluno-curso'];
      var aluno_semestre = request.body.queryResult.parameters['aluno-semestre'];

      const aluno = {
        nome: aluno_nome ,
        curso: aluno_curso,
        semestre: aluno_semestre,
      }
    
      try {
        await Alunos.create(aluno);
          response.json({"fulfillmentText": "Seus dados foram salvos! Podemos continuar nossa conversa."});
      } catch (error) {
          return response.json(error)
      }
    }
  }
 }