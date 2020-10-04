var FacebookStrategy = require('passport-facebook').Strategy;
var User= require('../models/users');

module.exports= function(app, passport) {
    passport.use(new FacebookStrategy({
        clientID: '337739973969860',
        clientSecret: 'd630065c76e8a3ebd14c365b1a9d065f',
        callbackURL: "http://127.0.0.1:8100/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate(..., function(err, user) {
          //if (err) { return done(err); }
          //done(null, user);
        //});

        done(null,profile);
      }
    ));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

    return passport;
}