// // It's done when the / homepage route renders a list of all projects from the database.
const router = require("express").Router();
const { User } = require("../models");
// const { User } = require('../models');
const Project = require('../models/Project');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// It's done when the /project/:id route renders an individual project's details based on the route parameter id.

router.get("/project/:id", async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id);
        console.log(projectData);
        res.render('project', projectData);
      } catch (err) {
        res.status(500).json(err);
      }
  });


// It's done when the /login route renders a form to log in and a form to create a new account.

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

// It's done when the /profile route renders the logged-in user's projects and a form to create a new project.

router.get("/profile/", async (req, res) => {
    try {
        const userData = await User.findAll({
          attributes: { exclude: ['password'] },
          order: [['name', 'ASC']],
        });
    
        const users = userData.map((project) => project.get({ plain: true }));
    
        res.render('profile', {
          users,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

module.exports = router;
