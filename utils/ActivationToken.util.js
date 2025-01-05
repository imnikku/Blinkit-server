import jwt from "jsonwebtoken";
const createActivationToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });
  return token;
};

export default createActivationToken;
