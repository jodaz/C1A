const Model = require('../models/User');
const isEmpty = require('../utils/isEmpty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const validateLogin = require('../validation/login');

const login = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) return res.status(400).json({ data: errors });

  const { login, password } = req.body;

  await Model.findOne({ 'login': login.toLowerCase() })
    .populate('votationCenter')
    .then(model => {
      if (isEmpty(model)) {
        errors.login = 'Usuario no encontrado.'

        return res.status(400)
          .json({ data: errors });
      }
      bcrypt.compare(password, model.password)
        .then(match => {
          if (match) {
            const payload = { id: model.id };

            jwt.sign(payload, SECRET, { expiresIn: 86400 }, (err, token) => {
              if (err) throw err;

              res.json({ success: true, token: token, user: model });
            });
          } else {
            errors.password = 'Contraseña incorrecta.';
            return res.status(400).json({ data: errors });
          }
        })
        .catch(err => console.log(err));
    });
};

module.exports = { login };
