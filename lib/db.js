const pg = require('pg');

const { Pool, Client } = require('pg')
const connectionString = process.env.POSTGRESQL_MESSAGES;

module.exports = {
   save: async function save(payload) {
      const client = new Client({ connectionString });
      client.connect();

      try {
         const post = `
            INSERT INTO messages(uuid, author, timestamp, data)
            VALUES ($1, $2, $3, $4)`;

         const values = [
            payload.uuid,
            payload.author,
            payload.timestamp,
            payload.message
         ];

         await client.query(post, values);
         client.end();
      }
      catch (err) {
         client.end();
         console.log(err);
      }
   }
};