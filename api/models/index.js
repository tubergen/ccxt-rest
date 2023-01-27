"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const basename = path.basename(__filename);
const ccxtConfig = require("../config");
const env = ccxtConfig.env || "production";
const dbConfig = ccxtConfig.dbConfigPath
  ? require(ccxtConfig.dbConfigPath)
  : require(`${__dirname}/../config/database/${env}.js`);
const db = {};

console.log("dbConfig");

if (
  dbConfig.dialect &&
  dbConfig.dialect.toLowerCase() == "sqlite" &&
  dbConfig.storage &&
  !dbConfig.storage.toLowerCase().includes("memory")
) {
  fs.mkdirSync(path.dirname(path.resolve(dbConfig.storage)), {
    recursive: true,
  });
}

let sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

console.log("sequelize: ", { sequelize });
console.log("PROCESS.ENV", { env: process.env });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // Updated according to https://stackoverflow.com/questions/62917111/sequelize-import-is-not-a-function
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("MIGRATE");
db.migrate = async function () {
  const sequelize = new Sequelize(dbConfig);
  // Updated according to
  // https://stackoverflow.com/questions/72003461/sequelize-umzug-migrations-error-invalid-umzug-storage
  console.log("SEQUELIZE", { sequelize });
  console.log("DBCONFIG", { dbConfig });
  console.log("ENV", { env });

  console.log("sequelize.getQueryInterface()", {
    getQueryInterface: sequelize.getQueryInterface(),
  });
  const umzug = new Umzug({
    migrations: {
      glob: "api/migrations/*.js",
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
};

module.exports = db;
