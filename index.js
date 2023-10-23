const Alexa = require('ask-sdk-core');
const axios = require('axios');

const GetConnectedDevicesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetConnectedDevicesIntent';
    },
    async handle(handlerInput){
        try{
            const response = await axios.get('https://api.ascf.me:1044/api/v2/monitor/wifi/ap_status/?access_token=kf6ymhOGzQfztxr5hd7qyzgcN6hGH7');
            const connectedDevicesCount = response.data.connectedDevcices;

            const speakOutput = `Há ${connectedDevicesCount} dispositivos conectados à rede.`;

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
        } catch(error){
            console.log(`Error: ${error}`);
            const speakOutput = "Desculpe, não consegui obter as informações no momento. Por favor, tente novamente mais tarde.";

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
        }
    },
};


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
.addRequestHandlers(
    GetConnectedDevicesIntentHandler
)
.lambda();