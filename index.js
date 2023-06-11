const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json({ limit: 2000000 }));
app.use(cors());
app.use(express.static("www"));
const client = new MongoClient('mongodb://127.0.0.1:27017/');
const db = client.db('PhotoTest');
const profiles = db.collection('profiles');


app.listen(3000, () => {
    console.log('Listening on port 3000');
});


app.post('/photoupload', async (req, res) => {
    const { id, image } = req.body;
    await profiles.insertOne({ id, image });
    return res.send('Uploaded');
})


app.post('/getphoto', async (req, res) => {
    const { id } = req.body;
    const data = await profiles.findOne({ id });
    return res.send(data);
})
