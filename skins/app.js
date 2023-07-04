const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const db = "mongodb+srv://user:teUAobt9rlRlyuMx@leagueskincluster.mwe0wxw.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Could not connect to MongoDB', err);
});

// Define schema and model
const skinSchema = new mongoose.Schema({
    champion: String,
    skinName: String,
    releaseDate: Date,
    price: Number
});

skinSchema.index({
  champion: 'text',
  skinName: 'text'
});

const Skin = mongoose.model('Skin', skinSchema);

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: "https://zeneos.github.io"
}));
app.use(bodyParser.json());

// Routes
app.get('/skins', async (req, res) => {
    const skins = await Skin.find({});
    res.json(skins);
});

app.get('/skins/search', async (req, res) => {
    const query = req.query.q;
    const skins = await Skin.find({ $text: { $search: query } });
    res.json(skins);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});