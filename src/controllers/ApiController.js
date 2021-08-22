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
                "Ótimo! Precisamos de algumas informações. Quer responder agora?"
              ]
            },
          },
        ]
      });

    } else if (intentName === 'onboarding.aluno-yes') {
      var aluno_nome = request.body.queryResult.parameters['aluno-nome'];
      var aluno_matricula = request.body.queryResult.parameters['aluno-matricula'];

      const aluno = {
        nome: aluno_nome ,
        matricula: aluno_matricula,
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