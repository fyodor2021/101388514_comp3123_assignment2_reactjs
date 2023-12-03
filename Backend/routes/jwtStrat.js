
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
module.exports = (passport) => {
    let opt = {};
    opt.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt')
    opt.secretOrKey = "JwTtOkEnS123EcreT";
    passport.use(new JWTStrategy(opt, (jwtpayload, done) => {
        try {
            return done(null, jwtpayload);
        } catch (error) {
            return done(error, false);
        }
    }));

}