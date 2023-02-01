"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: sequelize }) => {
    console.log("sequelizesequelizesequelize: ", { sequelize });

    await sequelize.getQueryInterface().createTable("Exchanges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exchangeName: {
        type: DataTypes.STRING,
      },
      exchangeId: {
        type: DataTypes.STRING,
      },
      params: {
        type: DataTypes.BLOB,
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
    await sequelize.getQueryInterface().dropTable("Exchanges");
  },
};
