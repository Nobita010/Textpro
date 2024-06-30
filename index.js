const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const urlProMap = require('./textpro_urls.json');

const app = express();

app.get('/textpro', async (req, res) => {
    try {
        const text = req.query.text;
        const number = req.query.number;

        if (!text || !number) {
            return res.status(400).json({ error: 'Missing text or number parameter' });
        }

        const urlPro = urlProMap[number];

        if (!urlPro) {
            return res.status(400).json({ error: 'Invalid number parameter' });
        }

        const response = await axios.get(urlPro);
        const $ = cheerio.load(response.data);

        const token = $('input[name="token"]').val();
        const option = $('select[name="option"]').val();
        const submit = $('input[type="submit"]').val();

        const formData = {
            text,
            token,
            option,
            submit
        };

        const logoResponse = await axios.post(urlPro, formData);
        const logoUrl = extractLogoUrl(logoResponse.data);

        res.json({ logoUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate logo' }); 
    }
});

function extractLogoUrl(html) {
    const $ = cheerio.load(html);
    const logoUrl = $('#form_value > div > a').attr('href');
    return logoUrl;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
