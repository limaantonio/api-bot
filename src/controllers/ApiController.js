const Content = require('../models/Content')
const Alunos = require('../models/Alunos')
var buscaCep = require('busca-cep');
const { auth } = require('googleapis/build/src/apis/calendar');
const {google} = require('googleapis');

const calendar = google.calendar('v3');

const calendarId = process.env.ID_AGENDA;

const serviceAccount = {
  "type": "service_account",
  "project_id": "assistenteestudantil-imel",
  "private_key_id": "ce1c8e306ed45345d74cdbc0c9f6b5847c5a40ce",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3FpZ3Ir3U1/VN\nGfOaTGsTP9D2MHee7S/YbwD21zfDtHRt9/lfcHJUcnrmT/+LlXSjhvmFT5ZL1PrL\ns/WTq5PS7O72FUmhkbaJ9lLXQsVgoKUI98gKYxgphukUJEwyAHaDGS7dhK45rixp\nKL7h/HmxAzFNdI1JqluXHJDg2t0NMtZ1Jf3Jn4YjxCt/Qv9Bwx+y4VuZws8z5dK+\nRncH4hsKv25dqgw986w0k4JtyMjJiw1b/HrAtSv3CTGcbi64btOJMtFYiCa/JTBq\nv4bBWUMFNBKQQwk1j6qNkW0mzycg/Azin0t/LR1j3xyMtAom69z8FRZZOgr5xzEV\nx7HnaTjvAgMBAAECggEAM8fQoDsUIyk8uCSZz87DDbujtqz4d9svB/BE/orZu6DC\nuQND5OkhfJ6wAYkoheqsBT+8PCbJJANFNu1bi/sfoKzf3Hsiyu4yCQzAWx8IQY7N\nfh7N1Zo3EC+WpdqqLg4Rdnxd08qdl7SZ3NfoPHOyWwzDGdvXxbjHlJJAq0da80st\n+swtKDEu8jSvnbl8HsTqCwcyI7OxmeCYkwrTVUHUYgQvYlxE9gYWI3ITDZZmeV2r\nie3G9q+R8CLynRam7OOF3RqnRKB6vkbeeHjrPNIdlfnZPo4vsDdi6IO5EBuTAbQo\n4p25RQheiuDEUv+ApT7GN6j9iLABHL5F8NUqMPKYOQKBgQDd64Ezs8fyQtRzheAt\nZ2l1XHp5mgLmifSJe7yRc0PA/qA5CN4AIyPdX81p6gOLTBW1SzbWBLlDcYqt+cX7\nKJRgHvx1OzW29EGABFo1+rjPXvgSBX0cH7g+oFBPZn6SVQyGKu2/8xOjIz1y7IZI\nVpB1DIX6b0WhV7l4deQyanjHowKBgQDTNHb6AcFTOH5v/uU+7y2Gl/Z3jbj1FiQG\nLnNvDB1+VTSjeNmz3xpjj+RSnIdSSzIRiN/Rc0IMoRr6B2HUoGhJZBm1jidBlPlO\n0MgvCZhIjjlAI7C/2K6l0CFslz5nSIBK3FdlzaCTYuhqzKssHL5qbgCY33NNtZBw\nhqc5L1WORQKBgQDJaA63tMeXuE2Glw8RRhRxHkBNkphlUPktua43N6xbQPx7JvAM\nodfP9z2/jVIwHxpokl2vOVRGwIqDQPgM7RRUdGrdnqIubFnx7IFPEkCee+uat36H\ngsY9mFOq7DOdbTDTp6xlFCBTZA1F+yIYDvBGOtpxooFIYAyFJkG3++eoDwKBgDjN\nkXon4rDZLtg8O7ezaBEc6cK5sRbpf4LSF2W0YnJJxEB7DkIcLOK+HnBBfPubEbo5\nj8irMQZohfLc7WjcQ3AJpgh4VQKEaJDUAiL0d6p75dXkQ3M1ebNKyNKF0tjAXRDF\nNhRBO4CoR04CAb95c5T4RNzYrBAoVtKMxIjSvDXpAoGAV1EFvp1MKtjMkFpIMdmB\n4MiTCwChFJOgUBUAPuH5s6OdrT1aI6Jy3YI2VhICCVVHOjbujJWABoYpI0DbX9sA\ning4XzNAE7lmnjvwiAiN4zlUvhk8zibP6dUsqXAyLUPANqzCWUdtK+qgT/Ji7f90\n517WUmCg/PWpbr/aKeqGIwg=\n-----END PRIVATE KEY-----\n",
  "client_email": "assistenteestudantilcalendar@assistenteestudantil-imel.iam.gserviceaccount.com",
  "client_id": "105901766124527602094",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/assistenteestudantilcalendar%40assistenteestudantil-imel.iam.gserviceaccount.com"
}

const timeZoneOffset = '-03:00';

const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

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
                      "Obrigado! Podemos continuar nossa conversa. \n Como posso te ajudar? \n Revisão \n Orientação \n Acompanhamento"
                    ],
                  },
                },
              ]
            }
          );
      } catch (error) {
          return response.json(error)
      }
    } 
    
    if (intentName === 'onboarding.aluno-no') {      
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
    
    if (intentName === 'revisao.quiz - yes') {
      let conteudo = request.body.queryResult.outputContexts[1].parameters['revisao-conteudo'];

      var quiz = `Aqui está um Quiz sobre ${conteudo}:\n
        Questão 1 - O que é um banco de dados?\n
        Questão 2 - Quais as formas normais?`
      
      response.json ({"fulfillmentText": quiz})
    }

    if (intentName === 'revisao.teste - yes') {

      let content = await Content.find(); 

      response.json ({
        "fulfillmentMessages" : [
          {
            "platform": "TELEGRAM", 
            "text": {
              "text": [
                content[0].data
              ]
            }
          }
        ]
      })
    }

    //professor configura os horarios de atendimento e o bot negocia
    if (intentName === 'agendamento - yes') {

      let aluno_nome = request.body.queryResult.parameters['aluno_nome'];
      let descricao = request.body.queryResult.parameters['descricao'];
      let data = request.body.queryResult.parameters['data'];
      let hora  = request.body.queryResult.parameters['hora'];
     
      const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' + hora.split('T')[1].split('-')[0] + timeZoneOffset));
      const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
      const agendamentoString = formatDate(new Date(data.split('T')[0])) + " as "+hora.split('T')[1].split('-')[0];

      return criarEventoCalendario(dateTimeStart, dateTimeEnd, descricao, aluno_nome).then(() => {
        let mensagem = `Excelente seu serviço esta agendado para ${agendamentoString}`;
        console.log(mensagem);
        response.json({"fulfillmentText":mensagem});
      }).catch(() => {
        let mensagem = `Desculpe, não temos mais vaga para ${agendamentoString}.`;
        response.json({"fulfillmentText":mensagem});
      });
    }
  }
}


function criarEventoCalendario(dateTimeStart, dateTimeEnd, descricao, aluno_nome) {

  return new Promise ((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth,
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
     
    if (err || calendarResponse.data.items.length > 0) {
      reject (err || new Error ('Requisicao conflita com outro agendamentos'));

    } else {
      calendar.events.insert({auth: serviceAccountAuth,
        calendarId: calendarId,
        resource: {summary: descricao +'-', description: '['+aluno_nome+']['+descricao+']',
          start: {dateTime: dateTimeStart},
          end: {dateTime: dateTimeEnd}}
          
        }, (err, event) => {
            err ? reject(err) : resolve(event);
          }
      );
    }
  })
})}

function formatDate(date) {
  var nomeMes = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
  ];

  var dia = date.getDate();
  var mesIndex = date.getMonth();
  var ano = date.getFullYear();

  return dia + ' ' + nomeMes[mesIndex] + ' ' + ano;
}

