let arc = require('@architect/functions');
let express = require('express');

let app = express();

app.get('/', (req, res) => res.send('Hello World!'));

exports.handler = arc.http.express(app);
