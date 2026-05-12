# Pet Clinic API

<div style="text-align: justify;">
A robust REST API designed for veterinary clinic management, built with <strong>TypeScript</strong>, <strong>Express</strong> and <strong>TypeORM</strong>. This system provides a scalable backend to manage users, pets, medical staff, and appointments.
</div>

## 🚀 Technologies & Tools

### Core Stack

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Typed superset of JavaScript for reliable development.
- **Express**: Fast, unopinionated web framework for the API layer.
- **TypeORM**: Data-Mapper ORM for seamless database interaction.
- **PostgreSQL**: Relational database management system.

### Development Ecosystem

- **Neon Tech**: Serverless PostgreSQL platform used for database hosting.
- **Postman**: Used for API testing and endpoint documentation.
- **TablePlus**: Primary GUI for database management and manual data inspection.
- **dbdiagram.io**: Utilized for designing and visualizing the Entity-Relationship Diagram (ERD).

## 📊 Database Architecture

<div style="text-align: justify;">
The database schema follows a relational model to ensure data integrity between owners, their pets, and medical appointments.

You can visualize the live Entity-Relationship Diagram here:

👉<a>[View ER Diagram on dbdiagram.io](https://dbdiagram.io/d/pet_clinic-69c2bc9578c6c4bc7a595605)</a>

</div>

## 📋 Key Features

- **User Management**: Manage clinic clients and pet owners.
- **Pet Records**: Track pet details and link them to specific species.
- **Medical Staff**: Administration of doctors and clinic personnel.
- **Appointment System**: Schedule and coordinate medical visits.
- **Auto-Sync**: Schema synchronization enabled for rapid development.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CarlosAlc91/03_backend_project_pet-clinic
   cd 03_backend_project_pet-clinic
   ```
2. **Install dependencies:**

```bash
 npm install
```

3. **Configure Environment Variables:**

Create a .env file in the root folder:

```bash
 DB_HOST=your_neon_host
 DB_PORT=5432
 DB_USERNAME=your_username
 DB_PASSWORD=your_password
 DB_DATABASE=pet_clinic_db
```

## Usage

- Developmen mode
  Runs the server with hot-reload (recommended for development)

```bash
 npm run dev
```

- Production build
  Compiles TypeScript to JavaScript and runs the production server:

```bash
npm run build
npm start
```

## 🔌 API Endpoints (Quick Reference)

### 👤 Users Module

All user routes are prefixed with `/api/users`.

| Method     | Endpoint                 | Description                                      |
| :--------- | :----------------------- | :----------------------------------------------- |
| **GET**    | `/api/users/`            | Get a list of all registered users.              |
| **POST**   | `/api/users/register`    | Register a new user in the system.               |
| **GET**    | `/api/users/:id/found`   | Find a specific user by their unique ID.         |
| **PATCH**  | `/api/users/:id/updated` | Update existing information for a specific user. |
| **DELETE** | `/api/users/:id/deleted` | Remove a user from the database.                 |

> **Note:** Replace `:id` with the actual UUID or ID of the user you wish to manage.

## 📂 Project Structure

- src/models/: TypeORM entity definitions (User, Pets, Doctor, etc.).

- src/database/: Database connection management via the PostgresDatabase class.

- src/services/: Core business logic and data processing.

- src/controllers/: API route handlers and request validation.

## 🛡️ Database Configuration

<div style="text-align: justify;">
The project utilizes a custom PostgresDatabase class. In development, synchronize: true is enabled to automatically update the database schema based on the defined entities.
The configuration also includes SSL support with rejectUnauthorized: false to ensure seamless connectivity with Neon Tech and other cloud-based database providers.
</div>
