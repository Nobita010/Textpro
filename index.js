const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const urlProMap = require('./textpro_urls.json'); // Load URLs from JSON

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the index.html file
});

app.get('/textpro', async (req, res) => {
    try {
        // ... (rest of the API code is the same as before)
    } catch (error) {
        // ... (error handling)
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
