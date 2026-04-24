const { getTenantModels } = require('../models');

const getAll = async (req, res, next) => {
  try {
    const { Product } = await getTenantModels(req.tenantId);
    res.json(await Product.findAll());
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const { Product } = await getTenantModels(req.tenantId);
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { Product } = await getTenantModels(req.tenantId);
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { Product } = await getTenantModels(req.tenantId);
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(await product.update(req.body));
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const { Product } = await getTenantModels(req.tenantId);
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
