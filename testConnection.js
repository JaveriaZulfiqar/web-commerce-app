require('dotenv').config();
const { sequelize } = require('./config/database');

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL successfully!');
    console.log(`   Host     : ${process.env.DB_HOST}`);
    console.log(`   Database : ${process.env.DB_NAME}`);
    console.log(`   User     : ${process.env.DB_USER}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
