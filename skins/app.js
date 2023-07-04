const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:teUAobt9rlRlyuMx@leagueskincluster.mwe0wxw.mongodb.net/?retryWrites=true&w=majority";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Define schema and model
const skinSchema = new mongoose.Schema({
    champion: String,
    skinName: String,
    releaseDate: Date,
    price: Number
});

const Skin = mongoose.model('Skin', skinSchema);

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/skins', async (req, res) => {
    const skins = await Skin.find({});
    res.json(skins);
});

app.get('/skins/search', async (req, res) => {
    const query = req.query.q;
    const skins = await Skin.find({ $text: {$search: query } });
    res.json(skins);
});

// Run
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port ${port}');
});