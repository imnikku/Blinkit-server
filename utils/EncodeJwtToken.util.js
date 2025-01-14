import jwt from "jsonwebtoken";
const encodeJwtToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export default encodeJwtToken;
