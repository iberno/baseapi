const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

/**
 * @desc Register User
 * @route POST /register
 * @access Public
 */
exports.authRegister = async (req, res) => {
  const { email } = req.body;
  
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });
    
      const user = await User.create(req.body);
      
      user.password = undefined;
    
    return res.send({ 
      user,
      token: generateToken({ id: user.id }),
     });

  } catch(err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
}

/**
 * @desc Authentication
 * @route POST /login
 * @acess Public
 */
exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  
  if (!user)
    return res.status(400).send({ error: 'User not found' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid Password' });
  
  user.password = undefined;

  res.send({ 
    user, 
    token: generateToken({ id: user.id })
  });
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })

    if(!user)
      return res.status(400).send({error: "User Not Found!"});

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });
    
    const mail = {
      from: 'imerno@gmail.com',
      to: email,
      subject: "Forgot Password",
      context: { token },
    }
    mailer.sendMail(mail, (err) => {
      if(err)
        return res.status(400).send({error: "Cannot possible to send email to reset your passwor!"});
      console.log(mail);
      
      return res.send();
    });
  } catch (err) {
    console.log(err);
    
    return res.status(400).send({error: "Error on forgot password, try again"});
  }
}

