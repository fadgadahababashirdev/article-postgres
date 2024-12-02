const jwt = require('jsonwebtoken');
const authorization = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(404).json({ status: 'failed', message: 'No token provided' });
    } else {
      jwt.verify(token, process.env.APP_SECRET, (err, decoded, next) => {
        if (err) {
          res.status(404).json({ status: 'failed', message: 'invalid token' });
        } else {
          req.user = decoded.id;
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

module.exports = authorization;
