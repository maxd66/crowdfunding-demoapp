// // It's done when the / homepage route renders a list of all projects from the database.
const router = require("express").Router();
const User = require('../models/User');

router.get("/", async (req, res) => {
  res.render("homepage", {});
});

// It's done when the /project/:id route renders an individual project's details based on the route parameter id.

router.get("/project/:id", async (req, res) => {
    try {
        const projectData = await User.findByPk(req.params.id);
        console.log(projectData);
        res.render('project', projectData);
      } catch (err) {
        res.status(500).json(err);
      }
  });


// It's done when the /login route renders a form to log in and a form to create a new account.

// It's done when the /profile route renders the logged-in user's projects and a form to create a new project.

module.exports = router;
