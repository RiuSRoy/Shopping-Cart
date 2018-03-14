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
} , (req,email,password,done) =>
{
    var username = req.body.username;

    req.checkBody('email' , 'Email field is required').notEmpty();
    req.checkBody('email' , 'Invalid email').isEmail();
    req.checkBody('password' , 'Password field is required').notEmpty();
    req.checkBody('password','Password length should be greater than 3').isLength({min : 4});
    req.checkBody('username' , 'Username field is required').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        console.log('Signup thik se kar bc!')
        var messages = [];
        errors.forEach((element) => {
            messages.push(element.msg);
        });
        return done(null,false,req.flash('signupMessage',messages));
    }
    else{
        console.log('Bhai ....fill toh thik hi kiya tune...aage dekhte h!');
        User.findOne({'email' : email}, (err,user) =>{
            if(err) {
                return done(err);
            }
            if(user) {
                console.log('OOPpppssss!!!\n')
                return done(null,false ,req.flash('signupMessage', 'This Email is already taken.'));
            }
            
        });
        User.findOne({'username' : username}, (err,user) =>{
            if(err) {
                return done(err);
            }
            if(user) {
                console.log('OOPpppssss!!!\n')
                return done(null,false ,req.flash('signupMessage', 'This username is already in use!'));
            }
            else {
                var newUser = new User();
                newUser.email = email;
                newUser.username = username;
                newUser.password = newUser.encryptPassword(password);
                newUser.save((err,result) => {
                    if(err) {
                        return done(err);
                    }
                    return done(null , newUser);
                });
            }            
        });
    }        
}));

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
        console.log('Signin toh thik se kar le bc!!')
        var messages = [];
        errors.forEach((element) => {
            messages.push(element.msg);
        });
        return done(null,false,req.flash('signinMessage',messages));
    }
    else{
        console.log('Bhai ...bhara toh poora hi tune...aage dekhte h!');
        User.findOne({'email' : email}, (err,user) =>{
            if(err) {
                console.log('error aa gaya!');
                return done(err);
            }
            if(!user) {
                console.log('pehle signup kiya jata h unpadh!!!\n');
                return done(null,false ,req.flash('signinMessage', 'User not found!'));
            }
            if(!user.validPassword(password)){
                console.log('dusre ka account nahi use karte bacche :)');
                return done(null , false , req.flash('signinMessage', 'Incorrect password!...Not You??'));
            }
            console.log('Signin ho gaya bey!')
            return done(null,user);
        });
    }
}));