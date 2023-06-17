const User = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword});

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    // password:newUser.password,
    
  })
};
 

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email node faund");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email node faund");
  }

  const token = "jkklkkllkjkl";
  res.json({
    token,
  })

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    // password:newUser.password,
  });
};


module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
