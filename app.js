const path = require('path');
const express = require('express');
const gameRoutes = require('./routes/game')

const app = express();
const port = process.env.PORT || '3000';

app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`);
});

gameRoutes(app);







