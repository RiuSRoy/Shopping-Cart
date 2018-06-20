const passport = require('passport');
const router = require('express').Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile' , 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    res.redirect('/user/profile/');
});

module.exports = router;
