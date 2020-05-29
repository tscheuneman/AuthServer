module.exports = {
   "name": "default",
    "type": process.env.DB_TYPE ? process.env.DB_TYPE : "postgres",
    "host": process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    "port": process.env.DB_PORT ? process.env.DB_PORT : 5432,
    "username": process.env.DB_USER ? process.env.DB_USER : "postgres",
    "password": process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "password",
    "database": process.env.DB_DB ? process.env.DB_DB : "auth",
    "synchronize": true,
    "logging": false,
    "esModuleInterop": false,
    "entities": [
       "dist/Models/**/*.js"
    ],
    "migrations": [
       "migrations/**/*.ts"
    ],
    "subscribers": [
       "dist/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "dist/Models",
       "migrationsDir": "migrations",
       "subscribersDir": "dist/subscriber"
    }
 }