const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose
  .connect('mongodb://localhost/notebook-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

// Settings
app.set('port', process.env.PORT || 3000);
let port = app.get('port');

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api/notes', require('./routes/notes'));

// Static files
app.use(express.static(__dirname + '/public'));
// console.log(__dirname + '/public');

// Server config
app.listen(port, () => console.log(`Server started on ${port} port`));
