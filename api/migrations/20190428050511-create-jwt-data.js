"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("JwtData", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      secret: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("JwtData");
  },
};
