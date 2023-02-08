const DataTypes = require("@sequelize/core");
const db = require("../database/connection");
// // const { sequelize } = require('../database/config');
// // const sequelize = new Sequelize('mysql::memory:');


const Arrowchat = db.define('arrowchat', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  from: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  to: {
    type: DataTypes.INTEGER
  },
  message: {
    type: DataTypes.STRING
  },
  sent: {
    type: DataTypes.INTEGER
  },
  read: {
    type: DataTypes.BOOLEAN
  },
  user_read: {
    type: DataTypes.BOOLEAN
  },
  direction: {
    type: DataTypes.BOOLEAN
  },
  priority_message_id: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.INTEGER
  },
  filename: {
    type: DataTypes.STRING
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  timestamps: false
  // Other model options go here
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = Arrowchat;