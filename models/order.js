const { DataTypes } = require('sequelize');

module.exports = (sequelize, schema) =>
  sequelize.define(
    'Order',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      customerEmail: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: { isIn: [['pending', 'confirmed', 'shipped', 'cancelled']] },
      },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    { schema }
  );
