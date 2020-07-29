require('dotenv').config({ path: `${__dirname}/config/.env` });

module.exports = {
   "type"        : "mysql",
   "host"        : process.env.MYSQL_HOST,
   "port"        : process.env.MYSQL_PORT,
   "username"    : process.env.MYSQL_USER,
   "password"    : process.env.MYSQL_PASSWORD,
   "database"    : process.env.MYSQL_NAME,
   "synchronize" : false,
   "logging"     : false,
   "entities"    : [
      "src/models/**/*.ts"
   ],
   "migrations"  : [
      "src/migrations/**/*.ts"
   ],
   "subscribers" : [
      "src/subscribers/**/*.ts"
   ],
   "cli"         : {
      "entitiesDir"    : "src/models",
      "migrationsDir"  : "src/migrations",
      "subscribersDir" : "src/subscribers"
   }
}
