const express = require('express');
const cors = require('cors');

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});