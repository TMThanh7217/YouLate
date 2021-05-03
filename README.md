# YouLate
```
npm install
sequelize init
```
modify config.json as follow:
```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "your local database name goes here",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
