const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
     
    let user = await User.findBy({email:req.body.email})
    if (!user) return res.status(400).send("invalid username or password")

   const pass=await bcrypt.compare(req.body.password, user.password)
   if (!pass) return res.status(400).send("invalid username or password")

   res.send(true)

  });

function validate(req) {
    const schema = {
      email: Joi.string().min(2).max(255).required().email(),
      password: Joi.string().min(2).max(255).required()
  
    };
    return Joi.validate(schema,req)
}

module.exports = router;
module.validate = validate;