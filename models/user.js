const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255

  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,

  },

});

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(2).max(255).required()

  };

  return Joi.validate(user, schema);
}

exports.Genre = User; 
exports.validate = validateUser;