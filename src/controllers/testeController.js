const Action = require('../models/Action')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');


module.exports = {
    
    teste (request, response){ 
     return response.json("Teste")
   },

   async criarDados(request, response){
     const action = await Action.create(request.body);

     return response.status(200).json(action);
   },

  //  fulfillmentText(request, response){
  //    var intentName = request.body.queryResult.intent.displayName;

  //    if(intentName === 'processo.seletivo'){
  //     response.json({"fulfillmentText": "Processo seletivo"});
  //    }else if(intentName === 'atendimento.horario'){
  //     response.json({"fulfillmentText": "Horario de atendimento"});
  //    }
  //  }

    async fulfillmentText(request, response){
     var intentName = request.body.queryResult.intent.displayName;

     if(intentName === 'processo.seletivo'){

      response.json({
        "fulfillmentMessages" : [{
            "card": {
              "title" : "Processo seletivo",
              "subtitle" : "Bem-vindo ao nosso processo seletivo",
              "imgUrl" : "https://tecnoblog.net/wp-content/uploads/2018/07/bot-twitter-700x394.jpg",
              // "buttons" : [
              //   {
              //     "text" : "button text",
              //     "postback" : "https://assistant.google.com/"
              //   }
              // ]
            }
          },
          {
            "text" : {
              "text" : [
                "Temos os melhores cursos nas areas de Humanas"
              ]
            }
          },
          {
            "text" : {
              "text": [
                "Voce quer participar do processo seletivo?"
              ]
            }
          }
        ]
      });
     }
     else if(intentName === 'processo.seletivo-yes'){

      var aluno_cep = request.body.queryResult.parameters['aluno-cep'];
      var aluno_nome;
      var aluno_cpf;
      var aluno_curso; 


      buscaCep(aluno_cep, {sync: false, timeout: 1000})
      .then(endereco => {

         aluno_nome = request.body.queryResult.parameters['aluno-cep'];
         aluno_cpf = request.body.queryResult.parameters['aluno-cpf'];
         aluno_curso = request.body.queryResult.parameters['aluno-curso'];

        var endereco = endereco.logradoro+"-"+endereco.bairro+","+endereco.localidade+"-"+endereco.uf+"--"+endereco.cep;
       
      });

      const aluno = {
        aluno_nome ,
        aluno_cpf,
        aluno_curso,
        endereco
      }
      

      await Alunos.create(aluno);

      return response.json({"fulfillmentText": "Voce foi cadastrado no nosso processo seletivo"});
     }
   }
 }