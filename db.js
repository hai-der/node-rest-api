const mongoose = require('mongoose');
const db =
  'mongodb+srv://admin:hashim12@creating-node-api-gynil.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
