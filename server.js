const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace 'your_mongodb_uri' with your actual MongoDB URI
mongoose.connect('your_mongodb_uri', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('Connected to MongoDB');
});

const fruitSchema = new mongoose.Schema({
 name: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

app.post('/addfruit', async (req, res) => {
 const fruit = new Fruit({ name: req.body.name });

 try {
    await fruit.save();
    res.send('Fruit added to database');
 } catch (err) {
    res.status(500).send(err);
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});