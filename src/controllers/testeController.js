module.exports = {
    
    teste (request, response){ 
     return response.json("Teste")
   },

   fulfillmentText(request, response){
     var intentName = request.body.queryResult.intent.displayName;

     if(intentName === 'processo.seletivo'){
      response.json({"fulfillmentText": "Processo seletivo"});
     }else if(intentName === 'atendimento.horario'){
      response.json({"fulfillmentText": "Horario de atendimento"});
     }
   }
 }