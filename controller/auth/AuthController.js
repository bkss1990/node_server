var User = require('../../models/User')
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config'); // get config file

exports.login = (req, res)=>{
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
}

 exports.logout = (req, res)=>{

  res.status(200).send({ auth: false, token: null });

 }


exports.register = (req, res)=>{
  // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  console.log(req.body)
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  console.log(req.body)

  User.create(req.body, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
}
exports.me = (req, res)=>{
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });


}
