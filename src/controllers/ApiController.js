const Action = require('../models/Action')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');


module.exports = {
    
   async criarDados(request, response){
     const action = await Action.create(request.body);

     return response.status(200).json(action);
   },

  async fulfillmentText(request, response){
    var intentName = request.body.queryResult.intent.displayName;

    if(intentName === 'onboarding.aluno'){

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
    }
    else if(intentName === 'onboarding.aluno-yes'){

    var aluno_cep = request.body.queryResult.parameters['aluno-cep'];
    var endereco; 


    buscaCep(aluno_cep, {sync: false, timeout: 1000})
    .then(endereco => {
      endereco = endereco.logradoro+"-"+endereco.bairro+","+endereco.localidade+"-"+endereco.uf+"--"+endereco.cep;
    });

      var aluno_nome = request.body.queryResult.parameters['aluno-nome'];
      var aluno_cpf = request.body.queryResult.parameters['aluno-cpf'];
      var aluno_curso = request.body.queryResult.parameters['aluno-curso'];

    const aluno = {
      nome: aluno_nome ,
      cpf: aluno_cpf,
      curso: aluno_curso,
      endereco: endereco
    }
    
    try {
    await Alunos.create(aluno);
    response.json({"fulfillmentText": "Voce foi cadastrado no nosso processo seletivo"});
    } catch (error) {
      return response.json(error)
    }
    }
  }
 }