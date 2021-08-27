const Action = require('../models/Action')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');
const { calendar } = require('googleapis/build/src/apis/calendar');

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
    } else if (intentName === 'agendamento') {

      let cliente = request.body.queryResult.outputContexts[1].parameter['aluno_nome'];

      let descricao = request.body.queryResult.parameters['descricao'];
      let data = request.body.queryResult.parameters['data'];
      let hora  = request.body.queryResult.parameters['hora'];

      const dateTimeStart = new Date(Date.parameters(data.split('T')[0] + 'T' + hora.split('T')[1].split('-')[0] + timeZoneOffset));
      const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
      const agendamentoString = formatDate(new date(data.split('T')) + " as "+hora.split('T')[1].split('-')[0]);


      return criarEventoCalendario(dateTimeStart, dateTimeEnd, descricao, tipo, cliente).then(() => {
        let mensagem = `Execelente seu serviço esta agendado para ${agendamentoString}`;
        console.log(mensagem);
        response.json({"fulfillmentText":mensagem});
      }).catch(() => {
        let mensagem = `Descuple, não temos mais vaga para ${agendamentoString}.`;
        reponse.json({'fulfillmentText':mensagem});
      });
    }
  }
 }

 function criarEventoCalendario(dateTimeStart, dateTimeEnd, descricao, tipo, client) {
    return new Promise ((resolve, rejesct) => {
      calendar.events.list({
        auth: serviceAccountAuth,
        calendarId: calendarId,
        timeMin: dateTimeStart.toISOString(),
        timeMax: dateTimeEnd.toISOString()
        
      }, (err, calendarReponse) => {
        if (err || calendarReponse.data.items.length > 0) {
          rejesct (err || new Error('Requisicao conflita com outro agendamentos'));

        } else {
          calendar.events.insert({auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: descricao +'-'+tipo+'-', description: '['+cliente+']['+descricao+']['+tipo+']',
            start: {dateTime: dateTimeEnd},
            end: {dataTime: dateTimeEnd}}
          }, (err, event) => {
            err ? rejesct(err) : resolve(evente);
            }
          );
        }
      })
    })
  }
