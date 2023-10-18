const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


// use middleWare 

app.use(cors());
app.use(express.json())



// mongoDB connection 
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vn1kdxv.mongodb.net/?retryWrites=true&w=majority`;
const { MongoClient, ServerApiVersion } = require('mongodb');


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {

  try {
    await client.connect();

    const companyCollection = client.db('companiesDB').collection('companyCollection');

  
    const brandsDB = client.db('brandsDB');
    const appleCollection = brandsDB.collection('appleCollection');
    const xiaomiCollection = brandsDB.collection('xiaomiCollection');
    const samsungCollection = brandsDB.collection('samsungCollection');
    const sonyCollection = brandsDB.collection('sonyCollection');
    const googleCollection = brandsDB.collection('googleCollection');
    const asusCollection = brandsDB.collection('asusCollection');



    // get all brand 
    app.get('/companies', async (req, res)=>{
      const companies = await companyCollection.find().toArray();
      res.send(companies)
    })

    // get specific single brand data
    
    app.get('/products/apple', async (req, res) =>{
      const products = await appleCollection.find().toArray();
      res.send(products);
    })
    app.get('/products/xiaomi', async (req, res) =>{
      const products = await xiaomiCollection.find().toArray();
      res.send(products);
    })
    app.get('/products/samsung', async (req, res) =>{
      const products = await samsungCollection.find().toArray();
      res.send(products);
    })
    app.get('/products/sony', async (req, res) =>{
      const products = await sonyCollection.find().toArray();
      res.send(products);
    })
    app.get('/products/google', async (req, res) =>{
      const products = await googleCollection.find().toArray();
      res.send(products);
    })
    app.get('/products/asus', async (req, res) =>{
      const products = await asusCollection.find().toArray();
      res.send(products);
    })

    // create a new product on specific brand

    app.post('/brand/apple', async (req, res) => {
      const newProduct = req.body;
      const result = await appleCollection.insertOne(newProduct);
      res.send(result);
    })

    app.post('/brand/xiaomi', async (req, res) => {
      const newProduct = req.body;
      const result = await xiaomiCollection.insertOne(newProduct);
      res.send(result);
    })

    app.post('/brand/samsung', async (req, res) => {
      const newProduct = req.body;
      const result = await samsungCollection.insertOne(newProduct);
      res.send(result);
    })

    app.post('/brand/sony', async (req, res) => {
      const newProduct = req.body;
      const result = await sonyCollection.insertOne(newProduct);
      res.send(result);
    })

    app.post('/brand/google', async (req, res) => {
      const newProduct = req.body;
      const result = await googleCollection.insertOne(newProduct);
      res.send(result);
    })

    app.post('/brand/asus', async (req, res) => {
      const newProduct = req.body;
      const result = await asusCollection.insertOne(newProduct);
      res.send(result);
    })


    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, ()=>{
    console.log('server running on port', port)   
})