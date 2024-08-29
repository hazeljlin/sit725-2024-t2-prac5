const Project = require('../models/project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch projects from the database
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error fetching projects", error: error.message });
  }
};

module.exports = { getProjects };
