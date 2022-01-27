const functions = require("firebase-functions");

//// SDK Config ////

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: functions.config().openai.id,
    apiKey: functions.config().openai.key,
});

const openai = new OpenAIApi(configuration);

//// Puppeteer scrape data from Twitter for better AI context ////

const puppeteer = require('puppeteer');

async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/jimcramer', {
        waitUntil: 'networkidle2',
    });

    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'example.png' });

    const tweets = await page.evaluate(async () => {
        return document.body.innerText;
    });

    await browser.close();

    return tweets;
}

exports.helloWorld = functions.https.onRequest(async (request, response) => {

    /*const tweets = await scrape();
    const prompt = `Mars is `;

    const gptCompletion = await openai.createCompletion('text-davinci-001', {
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 120,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    response.send(gptCompletion.data.choices[0].text);*/

    response.send(`hello world: ${await scrape()}`);

});