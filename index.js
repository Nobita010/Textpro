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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // You might need to parse the response to extract the final image URL
        // This is a simplified version
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating text effect');
    }
}

app.get('/textpro', async (req, res) => {
    const { number, text } = req.query;

    if (!number || !text) {
        return res.status(400).json({ error: 'Number and text are required' });
    }

    const urlIndex = parseInt(number) - 1;

    if (urlIndex < 0 || urlIndex >= textProUrls.length) {
        return res.status(400).json({ error: 'Invalid number' });
    }

    try {
        const result = await createTextproEffect(textProUrls[urlIndex], text);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
