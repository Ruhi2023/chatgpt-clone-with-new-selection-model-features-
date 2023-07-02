
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "",
    apiKey: "",
});

// const response = await openai.listEngines();

const openai = new OpenAIApi(configuration);

// create api

const app = express()
//adding body parsers 
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Set the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Set the allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Allow credentials (if needed)
  // res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Continue to the next middleware
  next();
});


// adding cors
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 3020

app.post('/', async (req,res) => {
    const { message, currentModel } =req.body;
   console.log(message, "message")
   console.log(currentModel, "currentModel")
    const response = await openai.createCompletion({
       model: `${currentModel}`,//"text-davinci-003",
       prompt: `${message}`,
       max_tokens: 100,
       temperature: 0.5,
      });
     // console.log()
res.json({
  message : response.data.choices[0].text
    // data: response.data
   // data: message,
 })});
 app.get('/models', async (req,res) => {
  
const response = await openai.listModels();
console.log(response.data.data)
  res.json({
    models: response.data.data
  })
  });
app.listen(3020,()=> {
      console.log(`Example app listening at http://localhost:3020`)
});
