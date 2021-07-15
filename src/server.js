import express from 'express';
import {people} from './people.js';
import {promises as fs} from 'fs';

let app = express();

app.use(express.json());

app.get('/hello',(req,res) =>{
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

app.get('/people',(req,res) => {
    res.json(people);
});

app.get('/people/:name',(req,res) => {
    let {name} = req.params;
    let person = people.find(x => x.name === name);
    res.json(person);
});
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// these two lines needed for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get('/file-data', async(req,res) => {
    let data = await fs.readFile(__dirname + '/people-data.json')
    let people = JSON.parse(data);
    res.json(people);
});

app.post('/people',(req,res)=>{
    let adding = req.body;
    people.push(adding);
    res.json(people);
});