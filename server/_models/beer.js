var db = require('../_config/db');
var Sequelize = require('sequelize');

const beer = db.sequelize.define('bier_konsum', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    country: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    flaschen: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER
    },
    liter: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true,
    paranoid: true,
    tableName: 'bier_konsum'
});

module.exports = beer;