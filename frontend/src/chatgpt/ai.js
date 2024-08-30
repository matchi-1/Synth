import OpenAI from "openai/index.mjs";
import axios from "axios";
import * as cheerio from "cheerio";

const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "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"
});

const getSite = async (link) => {
    const res = await axios.get(`http://localhost:5000/?url=${link}`);
    let content = res.data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                        .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, '')
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const contents = content.split('\n');
    let finalText = []
    contents.forEach(content => {
        const tag = cheerio.load(content);
        const text = tag.text();
        finalText.push(text);
    })
    return finalText.join(' ');
}

function splitTextIntoThree(text) {
    const partLength = Math.ceil(text.length / 3);
    const part1 = text.slice(0, partLength);
    const part2 = text.slice(partLength, 2 * partLength);
    const part3 = text.slice(2 * partLength);

    return [part1, part2, part3];
}

async function chat(link, prompt) {
   const article = await getSite(link);
   const split = splitTextIntoThree(article);
   split.forEach((item) => { 
    console.log(item);
     console.log("\n")
     console.log("\n")
     console.log("\n")
    })
   let responses = []
    await Promise.all(split.map(async (text) => {
        const chatCompletion =  await client.chat.completions.create({
                    messages: [{ role: 'user', content: `Categorize specific blocks of text from the provided text into the following only, nothing more: Highly Relevant, Moderately Relevant, and Tangentially Relevant based on this prompt: '${prompt}' (if no prompt was given, based on the whole text). Keep the text from the provided article as is and make sure to include all text in the article provided. If you think the text contains no relevant items, return a blank string. Return a JSON format of {<category> : {[<texts>]} }with the keys being the categories The text is "${text}"`}],
                    model: 'gpt-3.5-turbo',
                }); 
        responses.push(chatCompletion.choices[0].message.content);
    }));
    return responses;
 }


 export {
    chat, getSite
 }
 //export default chat;
// const res = await chat();

// res.forEach((e) => {
//     const obj = JSON.parse(e);
//     console.log(obj);
// });