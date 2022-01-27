const functions = require("firebase-functions");

//// SDK Config ////

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: functions.config().openai.id,
    apiKey: functions.config().openai.key,
});

const openai = new OpenAIApi(configuration);

exports.helloWorld = functions.https.onRequest(async (request, response) => {

    const prompt = `Mars is `;

    const gptCompletion = await openai.createCompletion('text-davinci-001', {
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 120,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    response.send(gptCompletion.data.choices[0].text);

});