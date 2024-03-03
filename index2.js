const express = require('express');
const app = express();
const route = require('./routes/route'); // Renamed auth to authRoutes
const router=require('./routes/posts')

//mongodb setup
const mongoose = require('mongoose');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use(express.json())

app.use('/api/user', route);
app.use('/api/posts',router);

app.listen(3000, () => {
    console.log('Server up and running');
});