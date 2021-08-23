const Action = require('../models/Action')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');

module.exports = {
    
  async fulfillmentText(request, response){
    var intentName = request.body.queryResult.intent.displayName;

    if (intentName === 'onboarding.aluno-yes') {
      var aluno_nome = request.body.queryResult.parameters['aluno-nome'];
      var aluno_matricula = request.body.queryResult.parameters['aluno-matricula'];

      const aluno = {
        nome: aluno_nome ,
        matricula: aluno_matricula,
      }
    
      try {
        await Alunos.create(aluno);
          response.json (
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Obrigado! Podemos continuar nossa conversa. \n Como posso te ajudar? \n 1 - Revisão \n 2 - Orientação \n 3 - Acompanhamento"
                    ],
                  },
                },
              ]
            }
          );
      } catch (error) {
          return response.json(error)
      }
    } else if (intentName === 'onboarding.aluno-no') {
      
      response.json (
        {
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  "Entendo, entretanto não podemos continuar nossa conversa sem as suas informações."
                ]
              }
            }
          ]
        }
      )
    }

   
  }
 }