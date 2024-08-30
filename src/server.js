require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai'); 
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); 




const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

 app.get('/', (req, res) => {
    res.send('Server is running');
  });
  

  app.post('/synth', async (req, res) => {
    const { link } = req.body;
  
    try {
      const response = await axios.get(link);
      const content = response.data;
  

      const messages = [ 
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Please generate a json format citation for the following content
          using this template, give me only the plain text version, dont format it into a json:
          {
            "authors": [
              {
                "lastName": "Author's Last Name",
                "middleName": "Author's Middle Name",
                "firstName": "Author's First Name"
              },
              {
                "lastName": "Second Author's Last Name",
                "middleName": "Second Author's Middle Name",
                "firstName": "Second Author's First Name"
              }
              // Add more authors as needed
            ],
            "datePublished": "Date Published",
            "dateAccessed": "Date Accessed",
            "title": "Title",
            "websiteTitle": "Website Title",
            "url": "URL"
          } 
          
          \n${content}` }
      ];
  
      const gptResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 500 
      });

      
  
      const citation = gptResponse.choices[0].message.content.trim();

      console.log(typeof(citation));
      res.json({ citation });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the citation.' });
    }
  });
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });