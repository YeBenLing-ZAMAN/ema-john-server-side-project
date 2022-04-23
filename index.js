const express = require('express');
const cors = require('cors');
const port = process.env.PORT|| 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

//database connection 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8rorn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("emaJohn").collection("product");
  // perform actions on the collection object
  console.log('mongoDB in connected');
  client.close();
});



app.get('/',(req,res)=>{
    res.send('jhon is running and waitting for ema');
});

app.listen(port,()=>{
    console.log('port is running on', port);
})

 
