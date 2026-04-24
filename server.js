require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/database');
const { resolveTenant } = require('./config/tenant');
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => { console.error('DB connection failed:', err.message); process.exit(1); });

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', resolveTenant, productRoutes);
app.use('/api/tenants', tenantRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
