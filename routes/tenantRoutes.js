const { Router } = require('express');
const { provisionTenant } = require('../controllers/tenantController');

const router = Router();
router.post('/', provisionTenant);

module.exports = router;
