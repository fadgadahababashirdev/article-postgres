require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authors = require('../db/models/authors');

const authentication = async (req, res) => {
  const { email, password } = req.body;
  console.log('The email is ', email);
  console.log('The password is ', password);
  try {
    const user = await Authors.findOne({ where: { email: email } });
    if (!user) {
      res
        .status(401)
        .json({ status: 'failed', messgae: 'user does not exist' });
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);

      if (!rightPassword) {
        res.status(404).json({ status: 'failed', message: 'Wrong password' });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'user logged in successfully',
          token: jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: '24h',
          }),
        });
      }
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

module.exports = authentication;
