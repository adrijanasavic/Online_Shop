const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');
require('dotenv').config();
const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB IS CONNECTED.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));
//const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
    const reqBody = req.body
    console.log(reqBody);

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log('logovan user...',data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        // if (data)
        //     res.send(data);
        //  else 
        //     res.send('User not found');
        res.send()
    });

});

app.listen(5000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port: 5000`);
    }
});