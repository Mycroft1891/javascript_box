const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');


const initialize = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);

    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' })
    } catch (err) {
      return done(err)
    }
  }

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    authenticateUser
  ));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};


module.exports = initialize;
