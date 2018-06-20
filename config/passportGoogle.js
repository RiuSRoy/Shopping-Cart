var passport = require('passport');
var Users = require('../models/user');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('./keys');

passport.use(new GoogleStrategy({
    clientID : keys.google.CLIENT_ID,
    clientSecret : keys.google.CLIENT_SECRET,
    callbackURL : '/auth/google/redirect'
} , (accessToken , refreshToken , profile, done) => {
    Users.findOne({email : profile.emails[0].value} , (err,user) => {
        if(err) {
            return done(err, false);
        }
        if(user !== null) {
            user.thumbnail = profile._json.image.url;
            user.save()
            .then(user => {
                return done(null , user);
            } , err => done(err,false))
            .catch(err => {
                return done(err,false);
            })
        }
        else {
            new Users({
                username : profile._json.name.givenName,
                thumbnail : profile._json.image.url,
                email : profile.emails[0].value
            }).save((err,user) => {
                if(err) {
                    return done(err,false);
                }
                else {
                    console.log(user);
                    return done(null , user);
                }
            });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id).then((user) => {
        done(null, user);
    })
    .catch(err => {
        done(err,false);
    })
});