const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Predefined URLs for different effects
const textProUrls = [
    'https://textpro.me/free-advanced-glow-text-effect-873.html',  // 1
    'https://textpro.me/create-blackpink-logo-style-online-1001.html'  // 2
    // Add more URLs here
];

async function createTextproEffect(url, text) {
    try {
        const response = await axios.post(url, new URLSearchParams({ text }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            },
            maxRedirects: 5 // Follow redirects
        });

        // This is a simplified version, adjust based on actual response structure
        const imageUrl = response.data; // Parse response data to extract image URL

        return imageUrl;
    } catch (error) {
        console.error('Error creating text effect:', error.response ? error.response.data : error.message);
        throw new Error('Error creating text effect');
    }
}

app.get('/textpro', async (req, res) => {
    const { number, text } = req.query;

    if (!number || !text) {
        retur
