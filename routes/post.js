const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {
  let user = await User.findById({_id: req.user._id})
  res.json({user: user.name, posts: {title: 'first post', description: 'random data'}})
})

module.exports = router;