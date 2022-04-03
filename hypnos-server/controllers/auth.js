const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Role } = require("@models/users");

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("User not found");

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

  res.send({ token, user });
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  const clientRoleId = await Role.findOne({ name: "client" });

  if (!clientRoleId) return res.status(400).send("Client role not found");

  const user = await User.create({
    username,
    passwordHash: await bcrypt.hash(password, 10),
    role: clientRoleId
  });

  // TODO: Send email to user with a link to verify their email address

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

  res.send({ token, user });
};

// const checkTokenValidity = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   if (!user) return res.status(200).send({ valid: false });

//   const token = getTokenFromHeaders(req);

//   if (!token) return res.status(200).send({ valid: false });

//   const validity = await jwt.verify(token, process.env.JWT_SECRET);
//   console.log(validity);

//   const decoded = jwt.decode(token, process.env.JWT_SECRET);
//   if (decoded.id !== user._id) return res.status(200).send({ valid: false });

//   return res.status(200).send({ valid: true });
// };

module.exports = {
  login,
  signup
};
