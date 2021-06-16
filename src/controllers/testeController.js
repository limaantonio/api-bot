module.exports = {
    
    teste (request, response){ 
     return response.json("Teste")
   },

   fulfillmentText(request, response){
    response.json({"fulfillmentText": "Primeiro webhook"});
   }
 }