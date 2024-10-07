/* eslint-disable prettier/prettier */
export default {
  secret: process.env.JWT_SECRET || "mysecret",
  expiresIn: "1d",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "mysecret",
  refreshExpiresIn: "7d"
};
