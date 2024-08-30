import puppeteer from "puppeteer";
import express from 'express';
import cors from 'cors';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(express.json()) // for parsing application/json
app.use(cors());

const getSite = async (link) => {
    const browser = await puppeteer.launch({headless: "shell", devtools: false});
    const page = await browser.newPage();
    await page.goto(link);
    
    let content = await page.content();
    
    await browser.close()
    return content;
}

app.get('/', async (req, res) => {
    const site = await axios.get(req.query.url);
    const ret = site.data;
    console.log(site); 
    res.status(200).send(ret);
})

app.listen(port,  () => {console.log(`proxy listening on port ${port}`)})