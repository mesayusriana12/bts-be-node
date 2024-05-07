# BTS.id Backend Test Node.js

This is a test for the backend developer position at BTS.id. The test is to create a RESTful API using Node.js and Express.js.

## Technologies

- Node.js 
- Express.js 
- MySQL 
- Sequelize 

## How to run locally

These instructions will guide you on how to set up the app locally. Using GitBash terminal is preferred.

1. Clone the repository:

  ```bash
  git clone https://github.com/mesayusriana12/bts-be-node.git
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Configure the environment variables:

  - Copy `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```
  - Open the `.env` file and set the environment variables as needed. The following environment variables are required (for example)
  
      ```bash
      MYSQL_DB_HOST="localhost"
      MYSQL_DB_PORT="3306"
      MYSQL_DB_USER="root"
      MYSQL_DB_PASS="root"
      MYSQL_DB_NAME="be-test"

      JWT_SECRET="your-secret-key-here"
      JWT_EXPIRES_IN="12h"
      ```
4. Run the migrations:

  ```bash
  npm run setup
  ```
5. Start the server:

  ```bash
  npm run start
  ```

6. Dummy user is created with this credentials (if needed):

  ```bash
  username:admin
  password:admin
  ```