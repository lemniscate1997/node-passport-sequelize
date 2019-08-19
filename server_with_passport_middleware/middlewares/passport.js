const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Connection = require('./connection');

class Passport {
    static initialize() {
        passport.use(new LocalStrategy({
            usernameField: 'Username',
            passwordField: 'Password',
            passReqToCallback: true
        }, async(request, username, password, done) => {

            console.log('++ Is authenticated request ? ++', request.isAuthenticated());
            console.info('username ', username);
            console.info('password ', password);

            try {
                const user = await new Connection(username, password).validateUser(request);
                if (user) {
                    return done(null, user);
                }
                console.log('Invalid user : ', username, ' or password : ', password);
                return done(new Error('Invalid Username or password. Contact Admin.'), false, { message: 'Invalid Username or password' });
            } catch (error) {
                console.log("--------" + error);
                console.log('Unable to login user : ', username, ' or password : ', password);
                return done(new Error('Invalid Username or password.'), false, error);
            }

        }));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}

module.exports = Passport;