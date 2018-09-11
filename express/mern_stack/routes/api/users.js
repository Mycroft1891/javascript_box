import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../../models/User';
import key from '../../config/keys';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const errors = validateRegisterInput(req.body);

  if (errors.found) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email is taken';
      return res.status(400).json(errors);
    }

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const errors = validateLoginInput(req.body);

  if (errors.found) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.message = 'User not found'
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(hasMatched => {
      if (hasMatched) {
        const { id, name, email } = user;
        const payload = { id, name, email };
        jwt.sign(payload, key.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ token: `Bearer ${token}` });
        });
      } else {
        errors.password = 'Incorrect password';
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

export default router;