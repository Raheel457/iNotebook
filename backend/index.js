const express = require('express')
const cors = require('cors');
const connectToMongo = require("./db");


const app = express();

// allow cors origin requests
app.use(cors());


// Connecting to database
connectToMongo();
// Geting Json in body
app.use(express.json());

// Available Rotes
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/notes",require("./Routes/notes"))

app.get('/', (req, res) => {
  res.send('hello Raheel')
})
// Listening to port
app.listen(5000, ()=>{
    console.log("Connected to server");
})