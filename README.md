# web-commerce-app

A multi-tenant e-commerce REST API built with Node.js, Express, Sequelize, and PostgreSQL.

Each tenant is fully isolated using a dedicated PostgreSQL schema, ensuring zero data leakage between stores.

## Architecture

- Tenant isolation via PostgreSQL schemas (one schema per tenant)
- Tenant resolved from `X-Tenant-ID` header or subdomain
- Schema auto-provisioned on first request or via `/api/tenants`

## Tech Stack

- Node.js + Express
- Sequelize ORM
- PostgreSQL
- dotenv

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` with your PostgreSQL credentials.

### 3. Create the database
```bash
createdb multitenant_db
```

### 4. Start the server
```bash
npm run dev     # development (nodemon)
npm start       # production
```

## API Endpoints

### Health
```
GET /health
```

### Products (requires X-Tenant-ID header)
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Tenant Provisioning
```
POST /api/tenants
Body: { "tenantId": "store_name" }
```

## Example Usage

```bash
# Create a product for ali_store
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: ali_store" \
  -d '{"name":"Phone","price":500,"stock":10}'

# List products for ali_store
curl -H "X-Tenant-ID: ali_store" http://localhost:3000/api/products
```

## Environment Variables

| Variable    | Description              | Default       |
|-------------|--------------------------|---------------|
| PORT        | Server port              | 3000          |
| DB_HOST     | PostgreSQL host          | localhost     |
| DB_PORT     | PostgreSQL port          | 5432          |
| DB_NAME     | Database name            | multitenant_db|
| DB_USER     | Database user            | postgres      |
| DB_PASSWORD | Database password        |               |
