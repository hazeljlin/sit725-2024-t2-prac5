const express = require("express");
const mongoose = require("mongoose");
const projectController = require('./controllers/projectController');
const app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myAppDB')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// API endpoint to get the projects
app.get('/api/projects', projectController.getProjects);

// Port setup
const port = process.env.PORT || 3023;
app.listen(port, () => {
  console.log("App listening to: " + port);
});



