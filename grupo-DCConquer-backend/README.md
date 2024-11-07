# grupo-DCConquer-backend

## Contributors

- Vicente Aburto
- Agustín Herrera
- Agustín Suazo

# Documentation

## Variables

The following variables can be used as they are, or changed at will. The important thing is to maintain concordance during installation.

```
project_user = dcconquer_user
project_password = 12345
project_db_name = dcconquer
```

## Setup Guide

1. **Install PostgreSQL**  
   Ensure PostgreSQL is installed and running. This may vary by OS:

   - **Ubuntu/Linux:** Use `sudo apt install postgresql`.
   - **macOS:** Use `brew install postgresql` and start the service with `brew services start postgresql`.
   - **Windows:** Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/) and start the server through the installed software.

2. **Create a PostgreSQL User**  
   Create a PostgreSQL user for your project with superuser privileges, then set a password:

   - Run `createuser` with the `-s` (superuser) flag.
   - Assign a password to the user within the PostgreSQL command-line interface (`psql`).

3. **Set Up Databases**  
   Create three databases for different environments (development, test, production). Verify that they were created successfully by listing all databases in PostgreSQL.

4. **Environment Configuration**  
   In the project root, create an `.env` file to store your database configuration:

   ```bash
   DB_USER={project_user}
   DB_NAME={project_db_name}
   DB_PASSWORD={project_password}
   DB_HOST=localhost
   ```

   Replace placeholders with your actual database credentials.

5. **Install Project Dependencies**  
   Use a package manager (like `yarn` or `npm`) to install all required dependencies for your project.

6. **Run Migrations**  
   Use a migration tool (like `sequelize-cli`) to apply database migrations and prepare your database schema.

**Notes:**

- Ensure PostgreSQL commands (`createuser`, `createdb`, `psql`) and any package manager commands (`yarn` or `npm`) are available in your terminal environment.
- Adjust command syntax as needed depending on your operating system.
