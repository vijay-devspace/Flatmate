
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
const url = "mongodb://localhost:27017/Flatmate";//mongodb://localhost:27017
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

const transactrouter = require("./routes/transactions");
app.use('/transact', transactrouter);

app.use(express.json());
try {
    con.on('open', () => {
        console.log('connected');
    });
} catch (error) {
    console.log("Error: " + error);
}



const port = 9000;
app.listen(port, () => {
    console.log('Server started');
});
