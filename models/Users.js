const Sequelize = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define(
  "User",
  { 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    phoneNumber:{
      type: Sequelize.STRING,
      allowNull: false,
      },
    isAdmin:{
        type: Sequelize.BOOLEAN,
        //allowNull:false,
        defaultValue:false, 
    }
  },
  
);

User.sync();
module.exports = User;