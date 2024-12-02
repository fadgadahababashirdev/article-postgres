const bcrypt = require('bcryptjs');
const Authors = require('../db/models/authors');

const createAuthor = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Authors.findOne({ where: { email: email } });
    if (!user) {
      await Authors.create({
        username: username,
        password: hashPassword,
        email: email,
      });
      res
        .status(201)
        .json({ status: 'success', message: 'user created successfully' });
    } else {
      res
        .status(404)
        .json({ status: 'failed', message: 'user already exisists' });
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

module.exports = createAuthor;
