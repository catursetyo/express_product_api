# ExpressJS Simple Product API

A simple product CRUD API built with ExpressJS and Prisma ORM. Data is stored in PostgreSQL.

## Requirements

- Node.js 18+
- Docker (for the local PostgreSQL database)

## Running the app

Clone the repository and move into it:

```sh
git clone https://github.com/catursetyo/express_product_api.git
cd express_product_api
```

Install dependencies:

```sh
npm install
```

Create the environment file:

```sh
cp .env.example .env
```

Start the PostgreSQL container:

```sh
npm run db:up
```

Apply the migration and seed the initial data:

```sh
npm run db:migrate
npm run db:seed
```

Start the server:

```sh
npm start
```

The server runs at http://localhost:3001 (override with the `PORT` environment variable).

## Project structure

```
app.js                            entry point, mounts routes and listens
routes/productRoutes.js           endpoint definitions
controllers/productController.js  validation and Prisma queries
prisma/schema.prisma              database model
prisma/migrations/                migration history
prisma/seed.js                    initial data (Buku, Pulpen)
docker-compose.yml                local PostgreSQL service
.env.example                      database connection template
```

## Endpoints

| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/products`      | 200, all products as an array               |
| GET    | `/products/:id`  | 200, a single product; 404 if not found     |
| POST   | `/products`      | 201, creates a new product                  |
| PUT    | `/products`      | 200, updates a product by `id` in the body  |
| DELETE | `/products/:id`  | 200, deletes a product by `id`              |

Details:

- `GET /products` -> returns every product ordered by id.
- `GET /products/:id` -> returns a single product. Returns `404` with
  `{ "message": "produk tidak ditemukan" }` if the id does not exist.
- `POST /products` -> accepts `{ "name": "...", "price": 0 }` and returns the
  created product with status `201`.
- `PUT /products` -> accepts `{ "id": 1, "name": "...", "price": 0 }` and returns
  the updated product with status `200`.
- `DELETE /products/:id` -> removes the product and returns
  `{ "message": "produk berhasil dihapus" }`.

Validation errors return `400`:

| Condition                          | Message                                        |
| ---------------------------------- | ---------------------------------------------- |
| `name` missing or empty            | `name wajib diisi`                             |
| `price` not an integer or below 0  | `price wajib berupa bilangan bulat minimal 0`  |
| `id` not a positive integer        | `id tidak valid`                               |

## Testing examples

Start the server first, then:

```sh
# get all products
curl -i http://localhost:3001/products

# get product with id 1
curl -i http://localhost:3001/products/1

# get a product that does not exist
curl -i http://localhost:3001/products/999

# create a product
curl -i -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Pensil","price":3000}'

# update a product
curl -i -X PUT http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"id":1,"name":"Buku Tulis","price":20000}'

# delete a product
curl -i -X DELETE http://localhost:3001/products/2
```

## Database

Check the table before and after a request:

```sh
docker exec express_product_db psql -U postgres -d product_api \
  -c 'SELECT * FROM "Product" ORDER BY id;'
```

## Test results

| Request                                   | Status | Response                                      |
| ----------------------------------------- | ------ | --------------------------------------------- |
| `GET /products`                           | 200    | `[{"id":1,"name":"Buku","price":15000},{"id":2,"name":"Pulpen","price":5000}]` |
| `GET /products/1`                         | 200    | `{"id":1,"name":"Buku","price":15000}`        |
| `GET /products/999`                       | 404    | `{"message":"produk tidak ditemukan"}`        |
| `POST /products` valid                    | 201    | `{"id":3,"name":"Pensil","price":3000}`       |
| `POST /products` without name             | 400    | `{"message":"name wajib diisi"}`              |
| `POST /products` with string price        | 400    | `{"message":"price wajib berupa bilangan bulat minimal 0"}` |
| `PUT /products` valid                     | 200    | `{"id":3,"name":"Pensil 2B","price":4000}`    |
| `PUT /products` without id                | 400    | `{"message":"id tidak valid"}`                |
| `DELETE /products/3`                      | 200    | `{"message":"produk berhasil dihapus"}`       |
| `DELETE /products/999`                    | 404    | `{"message":"produk tidak ditemukan"}`        |
