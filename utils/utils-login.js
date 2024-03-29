const user = require("../api/users/users.model");

exports.validateEmail = (email) => {
  const reg = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return reg.test(email);
};

exports.validePassword = (password) => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return reg.test(password);
};

exports.valideName = (name) => {
  const reg = /[A-Za-z0-9]{3,25}/;
  return reg.test(name);
};

exports.duplicateMail = async (email) => {
  const doesEmailExist = await user.findOne({ email });
  if (doesEmailExist) {
    return false;
  } else return true;
};
