const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/database');
const defineProduct = require('./product');
const defineOrder = require('./order');

const tenantCache = {};

const getTenantModels = async (tenantId) => {
  if (tenantCache[tenantId]) return tenantCache[tenantId];

  const tenantSequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    { ...dbConfig }
  );

  await tenantSequelize.query(`CREATE SCHEMA IF NOT EXISTS "${tenantId}"`);

  const Product = defineProduct(tenantSequelize, tenantId);
  const Order = defineOrder(tenantSequelize, tenantId);

  Order.belongsTo(Product, { foreignKey: 'productId' });
  Product.hasMany(Order, { foreignKey: 'productId' });

  await tenantSequelize.sync({ schema: tenantId });

  tenantCache[tenantId] = { Product, Order, sequelize: tenantSequelize };
  return tenantCache[tenantId];
};

module.exports = { getTenantModels };
