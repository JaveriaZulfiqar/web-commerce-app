const TENANT_ID_REGEX = /^[a-z0-9_]+$/;

const isValidTenantId = (tenantId) => TENANT_ID_REGEX.test(tenantId);

module.exports = { isValidTenantId };
