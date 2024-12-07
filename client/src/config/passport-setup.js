// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Server/models/User'); // Adjust the path as necessary

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in our db
        let existingUser = await User.findOne({ where: { googleId: profile.id } });
        
        if (existingUser) {
            return done(null, existingUser);
        }
        
        // If not, create a new user in our db
        const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user' // Default role for new users
        });
        
        done(null, newUser);
    } catch (error) {
        console.error(error);
        done(error, null);
    }
}));

// Serialize user to save in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
