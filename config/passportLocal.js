var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user,done) => {
    done(null , user.id);
});
passport.deserializeUser((id,done) => {//id = user_id stored in the session 
    User.findById( id , (err,user) => {
        done(err, user);
    });
});
//strategy to create a new user
passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    } , (req,email,password,done) => {
        var username = req.body.username;

        req.checkBody('email' , 'Email field is required').notEmpty();
        req.checkBody('email' , 'Invalid email').isEmail();
        req.checkBody('password' , 'Password field is required').notEmpty();
        req.checkBody('password','Password length should be greater than 3').isLength({min : 4});
        req.checkBody('username' , 'Username field is required').notEmpty();

        var errors = req.validationErrors();
        if(errors) {
            var messages = [];
            errors.forEach((element) => {
                messages.push(element.msg);
            });
            return done(null,false,req.flash('signupMessage',messages));
        }
        else{
            User.findOne({email : email} , (err,user) => {      
                if(err) {
                    return done(err, false);
                }
                if(user !== null) {
                    return done(null , false, req.flash('signupMessage', 'This Email already has a signed-up user.'));
                }
                else {
                    User.findOne({'username' : username}, (err,user) =>{
                        if(err) {
                            return done(err,false);
                        }
                        if(user) {
                            return done(null,user ,req.flash('signupMessage', 'This username is already in use!'));
                        }
                        else {
                            var newUser = new User();
                            newUser.email = email;
                            newUser.username = username;
                            newUser.password = newUser.encryptPassword(password);
                            newUser.save((err,result) => {
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
                }        
            });
        }
    })
);

passport.use('local-signin',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    } , (req,email,password,done) => {

        req.checkBody('email' , 'Email field is required').notEmpty();
        req.checkBody('email' , 'Invalid email').isEmail();
        req.checkBody('password' , 'Password field is required').notEmpty();

        var errors = req.validationErrors();
        if(errors) {
            var messages = [];
            errors.forEach((element) => {
                messages.push(element.msg);
            });
            return done(null,false,req.flash('signinMessage',messages));
        }
        else{
            User.findOne({'email' : email}, (err,user) =>{
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null,false ,req.flash('signinMessage', 'User not found!'));
                }
                if(!user.validPassword(password)){
                    return done(null , false , req.flash('signinMessage', 'Incorrect password!...Not You??'));
                }
                return done(null,user);
            });
        }
    })
);