const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

//making express server
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

//OpenAI authentication
const configuration = new Configuration({
    organization: "org-8px2neCCzaqt2H4B339qpY36",
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

//exchanging data in server
app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    const { message } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${ message }`,
        max_tokens: 1000,
        temperature: 0,
      });
      console.log(response.data);
      if(response.data){
        if(response.data.choices){
            res.json({
                message: response.data.choices[0].text
            })
        }
      }   
})

app.listen(port, () => {
    console.log(`Starting server at ${port}`);
})







