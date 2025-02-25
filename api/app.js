const express = require('express');
const app = express();
const cors = require('cors');

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser'); //middleware  qui facilite la gestion des données envoyées dans le corps des requetes HTTP 

//Load in the mongoose models
const { List, Task } = require('./db/models');  //pour utiliser le contenu de fichier index.js qui contient l'importation des models et pour éviter d'importer chaque model individuellement

// Load middleware
app.use(bodyParser.json());

// CORS headers middleware

app.use(cors({
    origin: 'http://localhost:4200', // Autorise seulement ton frontend Angular
    methods: 'GET,POST,PATCH,DELETE', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Authorization' // En-têtes autorisés
  }));

/* ROUTE HANDLERS */

/* LIST ROUTES */

//Get all lists 
app.get('/lists',(req, res)=> {
    //we will return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

app.post('/lists', (req, res) => {
    //we will create a new list and return the new list document back to the user (which includes the id)
    //the list information (fields) will be passed in via the JSON request body

    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=> {
        res.send(listDoc);
    })
});

app.patch('/lists/:id', (req, res) => { //we use patch when we will update juste a part of resource 
    //we want to update the specified list (list document with id in the url) with the new values specified in JSON body

    List.findOneAndUpdate({_id: req.params.id }, {
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

app.delete('/lists/:id', (req, res)=> {
    //we will delete the specified list (document with id in the url )

    List.findOneAndDelete({_id : req.params.id }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

/* TASK ROUTES */


//get all tasks of a specific list
app.get('/lists/:listId/tasks', (req,res) =>{
    Task.find({_listId: req.params.listId}).then((tasks)=> {
        res.send(tasks)
    })
})

//get one task of a specific list
// app.get('/lists/:listId/tasks/:taskId', (req, res)=> {
//     Task.findOne({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then((task) => {
//         res.send(task);
//     })
// })


//add a new task in a specific list
app.post('/lists/:listId/tasks', (req,res) => {
    let newTask = new Task ({
        title: req.body.title,
        _listId: req.params.listId,
        description: req.body.description || "", // Valeur par défaut vide
        completed: req.body.completed || false,
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})


// update an existing task in a specific list
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
})




app.listen(3001, () => {
    console.log("server listening on port 3000")
})