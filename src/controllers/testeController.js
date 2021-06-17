module.exports = {
    
    teste (request, response){ 
     return response.json("Teste")
   },

  //  fulfillmentText(request, response){
  //    var intentName = request.body.queryResult.intent.displayName;

  //    if(intentName === 'processo.seletivo'){
  //     response.json({"fulfillmentText": "Processo seletivo"});
  //    }else if(intentName === 'atendimento.horario'){
  //     response.json({"fulfillmentText": "Horario de atendimento"});
  //    }
  //  }

     fulfillmentText(request, response){
     var intentName = request.body.queryResult.intent.displayName;

     if(intentName === 'processo.seletivo'){

      response.json({
        "fullfilmentMessages" : [{
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
          }
        ]
      });



     }
   }
 }