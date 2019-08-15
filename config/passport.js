const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//const { check, validationResult } = require('express-validator');

const User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  /*
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({ minLength: 6 });
  let errors = req.validationErrors();
  if (errors) {
    let messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  */
 /*
  check(email).isEmail();
  check(password).isLength({ min: 6});
  const errors = validationResult(req);
  if (errors) console.error(errors);
  if (!errors.isEmpty()) {
    let messages = errors.map(cur => cur.msg);
  }
  return done(null, false, req.flash('error', mesages));
  */
  User.findOne({ 'email': email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, { message: 'Email is already registered!'})
    }
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));