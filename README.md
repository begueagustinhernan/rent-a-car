# Rent-A-Car - Fleet Management API (Core Module)

A clean, production-ready RESTful API endpoint built with **NestJS**, **TypeScript**, and **TypeORM** designed to handle the core lifecycle and business rules of a vehicle fleet management system. 

This module serves as the foundational slice of the system, focusing on strict data validation, strong typing, and domain-specific constraints.

## 🚀 Key Features

* **Fleet Lifecycle CRUD**: Standardized endpoints for vehicle management (handling statuses like `AVAILABLE`, `MAINTENANCE`, etc.).
* **Domain Business Rules**: Custom service-layer validation that restricts vehicle base pricing according to its specific category.
* **Data Integrity**: Built using Class-Validator to ensure payload consistency before reaching the database.
* **Basic Entity Auditing**: Passive database tracking utilizing automatic timestamp columns (`createdAt`, `updatedAt`).

## 🛠️ Tech Stack

* **Framework**: NestJS
* **Language**: TypeScript
* **ORM**: TypeORM
* **Database**: PostgreSQL
* **Validation**: Class-Validator & Class-Transformer

---

## 📐 Business Domain Rules

The API enforces that a vehicle's base daily rate falls strictly within its category range upon creation or partial updates (`PATCH`):

| Vehicle Type | Min Price | Max Price |
| :--- | :---: | :---: |
| **COMPACT** | $20 | $45 |
| **SEDAN** | $30 | $70 |
| **SUV** | $50 | $120 |


---

## 🛣️ API Endpoints Reference

### Vehicles Module

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :---: |
| `POST` | `/vehicles` | Register a new vehicle | `201 Created` |
| `GET` | `/vehicles` | Retrieve all vehicles | `200 OK` |
| `GET` | `/vehicles/:id` | Get details of a specific vehicle | `200 OK` |
| `PATCH` | `/vehicles/:id` | Partially update attributes or status | `200 OK` |
| `DELETE` | `/vehicles/:id` | Remove a vehicle from the system | `204 No Content` |

### Sample Payload (`POST /vehicles`)

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "plate": "AF123JK",
  "basePricePerDay": 55,
  "type": "SEDAN",
  "status": "AVAILABLE"
}
```

---

## 🔧 Getting Started

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **Docker** & **Docker Compose** (for running the database container)

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/begueagustinhernan/rent-a-car.git
cd rent-a-car
```

2. **Install project dependencies:**
```bash
npm install
```

3. **Spin up the PostgreSQL database container:**
```bash
docker compose up -d
```
*(Note: This creates and starts the isolated database container running in the background).*

4. **Configure Environment Variables:**
Copy the example environment file to create your local `.env` configuration:
```bash
cp .env.example .env
```
Open the newly created `.env` file and fill in your local network database credentials.

5. **Run the application:**
```bash
# Development mode with hot-reload
npm run start:dev
```

The server will spin up at `http://localhost:3000`. You can now use Postman to test the endpoints against your local database container.