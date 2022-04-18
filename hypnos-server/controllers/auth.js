const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Role } = require("@models/users");
const { getTokenFromHeaders } = require("@utils/token");

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
  const { username, password, name } = req.body;
  const clientRoleId = await Role.findOne({ name: "client" });

  if (!clientRoleId) return res.status(400).send("Client role not found");

  const user = await User.create({
    name,
    username,
    passwordHash: await bcrypt.hash(password, 10),
    role: clientRoleId
  });

  // WHY NOT: Send email to user with a link to verify their email address

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

  res.send({ token, user });
};

const getUserRole = async (req, res) => {
  const token = getTokenFromHeaders(req);

  if (!token) return res.status(200).send({ role: null });

  const user = await User.findById(token.id);
  if (!user) return res.status(200).send({ role: null });

  const role = await Role.findById(user.role);
  if (!role) return res.status(200).send({ role: null });

  res.send({ role });
};

module.exports = {
  login,
  signup,
  getUserRole
};
