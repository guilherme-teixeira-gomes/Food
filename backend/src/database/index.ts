/* eslint-disable prettier/prettier */
/* eslint-disable */
import { Sequelize } from "sequelize-typescript";

import ResetPassWord from "../models/ResetPassword";
import UserCustomer from "../models/UserCustomer";
import Admins from "../models/Admins";
import Amtechs from "../models/Amtechs";



const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);

const models = [
  ResetPassWord,
  UserCustomer,
  Admins,
  Amtechs
];

sequelize.addModels(models);

export default sequelize;
