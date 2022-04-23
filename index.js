const express = require('express');
const cors = require('cors');  // for localy connect at different port 
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();  // for .evn file create and update database password
const port = process.env.PORT || 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

//database connection 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8rorn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('emaJohn').collection('product');

        app.get('/product', async (req, res) => {
            console.log('query', req.query);
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {} // eita ami khujbo...
            const cursor = productCollection.find(query);
            let products;
            if (page || size) {
                //0 --> skip : 0 get 0-10:
                //1 --> skip : 1*10 get 11-20:
                //2 --> skip : 2*10 get 21-30:
                //3 --> skip : 3*10 get 31-40:
                products = await cursor.skip(page*size).limit(size).toArray();
            } else {
                products = await cursor.toArray();
            }
            res.send(products);
        });

        
        app.get('/productCount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count });
        })
    }
    finally { }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('jhon is running and waitting for ema');
});

app.listen(port, () => {
    console.log('port is running on', port);
})


