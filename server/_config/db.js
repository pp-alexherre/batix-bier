var Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('batixdb', 'clientServer', '8bwEvQ1ECRdU0OJB', {
    host: 'db_batix',
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;