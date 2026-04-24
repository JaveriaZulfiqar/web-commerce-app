const { isValidTenantId } = require('./validator');

const resolveTenant = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'] || req.hostname.split('.')[0];

  if (!tenantId || tenantId === 'localhost')
    return res.status(400).json({ error: 'Tenant not identified' });

  if (!isValidTenantId(tenantId))
    return res.status(400).json({ error: 'Invalid tenant identifier' });

  req.tenantId = tenantId;
  next();
};

module.exports = { resolveTenant };
