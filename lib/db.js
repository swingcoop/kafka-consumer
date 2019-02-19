const Airtable = require('airtable');

const messages = 'appzS2C8RlCz74lNI';
const base = Airtable.base(messages);

function save(payload) {
   base('Messages').create(payload, function (err, record) {
       if (err) { 
         console.error(err); 
         return; 
      }
   });
}

module.exports = { save }