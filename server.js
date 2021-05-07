const express = require('express');
const bodyParser = require('body-parser');
const data = require('./app/controller.js');


// Configuring the database
const mongoose = require('mongoose');
const connectionString =  process.env.MONGODB_URI || "mongodb://localhost/crudApp";

// Connecting to the database
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
    }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Database sucessfully connected");
        }
    } 
    )

// connecting to express server
const app = express();

// Parse requests of content-type - application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Home Url 
app.get('/', (req,res) => {
    res.json('CRUD Express App is working');
})

// Create a new Data
app.post('/data', (req,res) => {data.handleCreate(req,res)});

// Retrieve the data
app.get('/data', (req,res) => {data.handleFind(req,res)});

// Update a data with its id
app.put('/data/:dataId', (req,res) => {data.handleUpdate(req,res)});

// Delete a data with its id
app.delete('/data/:dataId', (req,res) => {data.handleDelete(req,res)});

// listen to server
app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is working on port ${process.env.PORT}`);
});