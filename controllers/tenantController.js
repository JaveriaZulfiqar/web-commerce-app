const { getTenantModels } = require('../models');
const { isValidTenantId } = require('../config/validator');

const provisionTenant = async (req, res, next) => {
  try {
    const { tenantId } = req.body;
    if (!tenantId) return res.status(400).json({ error: 'tenantId is required' });
    if (!isValidTenantId(tenantId))
      return res.status(400).json({ error: 'tenantId must be lowercase letters, numbers, or underscores' });

    await getTenantModels(tenantId);
    res.status(201).json({ message: `Tenant '${tenantId}' provisioned successfully` });
  } catch (err) { next(err); }
};

module.exports = { provisionTenant };
