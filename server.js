const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myAppDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a Schema and Model
const projectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String
});

const Project = mongoose.model('Project', projectSchema);

// Seed initial data if the database is empty
const seedData = async () => {
  const projects = await Project.find();
  if (projects.length === 0) {
    await Project.insertMany([
      {
        title: "Kitten 2",
        image: "images/kitten2.jpg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2"
      },
      {
        title: "Kitten 3",
        image: "images/kitten3.jpeg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
      }
    ]);
    console.log('Seed data inserted');
  }
};

seedData();

// API endpoint to get the projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch projects from the database
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error fetching projects", error: error.message });
  }
});

// Port setup
const port = process.env.PORT || 3022;

app.listen(port, () => {
  console.log("App listening to: " + port);
});


