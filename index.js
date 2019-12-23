require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const axios = require('axios');
const smartsheetUrl = 'https://api.smartsheet.com/2.0';
const headers = {
  'Authorization': `Bearer ${process.env.SMARTSHEET_TOKEN}`,
  'Content-Type': 'application/json'
};

app.use(cors());

app.get('/sheets', (req, res) => {
  axios.get(`${smartsheetUrl}/sheets`, { headers })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.error('Error in sheets route:::: ', e);
      res.sendStatus(500);
    });
});

app.get('/sheets/:sheet', (req, res) => {
  const sheetId = req.params.sheet === 'k9PreCheck' ? process.env.K9_PRECHECK_SHEET : process.env.K9_PRECHECK_REGISTRATION_SHEET;
  axios.get(`${smartsheetUrl}/sheets/${sheetId}`, { headers })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.error('Error in sheets/k9PreCheck route:::: ', e);
      res.sendStatus(500);
    });
});

app.get('/columns/:sheet', (req, res) => {
  const sheetId = req.params.sheet === 'k9PreCheck' ? process.env.K9_PRECHECK_SHEET : process.env.K9_PRECHECK_REGISTRATION_SHEET;
  axios.get(`${smartsheetUrl}/sheets/${sheetId}/columns`, { headers })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      console.error('Error in sheets/k9PreCheck route:::: ', e);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Hooked on ${port}`);
});