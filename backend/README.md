executar servidor node sem nodemon
### node index.js

baixar nodemon como dependência de desenvolvimento
### npm install nodemon -D

editar no packge.json o trecho: 

"scripts": {
    "start": "nodemon src/index.js"
  }

executar nodemon 
### npm start

baixar knex.js
### npm install knex

instalar sqlite3 após instalar o knex.js
### npm install sqlite3

executar knex 
### npx knex init

editar parte do arquivo knexfile.js

development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

criar migration 
### npx knex migrate:make create_ongs