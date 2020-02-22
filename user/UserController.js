const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('./User');

// @route           POST /users
// @desc            Create a user
// @access          Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password }, (err, user) => {
    if (err)
      return res
        .status(500)
        .send('There was a problem adding the user to the database.');
    res.status(200).send(user);
  });
});

// @route           GET /users
// @desc            Gets all users
// @access          Public
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500).send('There was a problem finding the users.');
    res.status(200).send(users);
  });
});

// @route           GET /users/:id
// @desc            Gets a single user from the database
// @access          Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found');
    res.status(200).send(user);
  });
});

// @route           DELETE /users/:id
// @desc            Deletes a single user from the database
// @access          Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send(`User ${user.name} was successfully deleted`);
  });
});

// @route           PUT /users/:id
// @desc            Updates a user's information
// @access          Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err)
        return res.status(500).send('There was a problem updating the user.');
      res.status(200).send(user);
    }
  );
});

module.exports = router;
