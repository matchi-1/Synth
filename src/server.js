require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai'); // Use the latest import method
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes



// Create an OpenAI API client instance with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

 app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
  // Endpoint to handle citation requests
  app.post('/synth', async (req, res) => {
    const { link } = req.body;
  
    try {
      const response = await axios.get(link);
      const content = response.data;
  
      // Construct the prompt for GPT-4 Chat model
      const messages = [ 
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Please generate a json format citation for the following content. Don't format it in JSON, i only want the text. Only provide the citation without additional text. Use Author's Last Name, Author's Middle Name
Author's First Name, Date Published, Date Accessed, Title, Website Title, URL\n\nContent:\n${content}` }
      ];
  
      // Call GPT-4 Chat model to generate the citation
      const gptResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 500 // Adjust based on your needs
      });
  
      // Extract citation from the response
      const citation = gptResponse.choices[0].message.content.trim();
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