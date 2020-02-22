const express = require('express');
const cors = require('cors');

const news = require('./app/News');

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/', news);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
