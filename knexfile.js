module.exports = {
  development: {
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port: 5432,
        user : 'postgres',
        password : '1234',
        database : 'consensys'
    },
    pool: {
        min: 1, 
        max: 5
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
        directory: './migrations/seeds'
    }  
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
        min: 1, 
        max: 5
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
        directory: './migrations/seeds'
    }
  }
}