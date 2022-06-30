const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');
const serverConfig = require('./config/serverConfig')
require('dotenv').config();
const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB IS CONNECTED.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));
//const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log('logovan user...',data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        // way 1
        // if (data)
        //     res.send(data);
        //  else 
        //     res.send('User not found');
        
         // way 2
        // res.send(data ? data : 'User not found');
        
         // way 3
        res.send(data || 'User not found');
    });
});

app.post('/api/register', async (req, res) => {
    const reqBody = req.body;
    // console.log('reg user data:', reqBody);
    Users.findOne(reqBody, async (err, data) => {
        console.log('register user', data);
        if (err) {
            const errorMsg = `Error on register user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        if(data)
            res.send(`user already exist ${data.username}`); 
        else {
           const newUser = new Users(reqBody);
           const saveNewUser = await newUser.save();

           res.send(saveNewUser || 'User not registered.');
        }
    });
});


app.listen(serverConfig, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg)
    }
});