const kafka    = require('./kafka.js');
const db       = require('./db.js');
const consumer = kafka.consumer({ groupId: 'swingcoop4' });

async function consumeMessages() {

  await consumer.connect()
  await consumer.subscribe({ 
    topic: 'messages-0.1.0'
  });

  const run = async () => {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {

        var payload = {
          Message: message.value.toString(),
          Created: message.headers.timestamp.toString(),
          Author: message.headers.userId.toString()
        };

        db.save(payload);
      },
    })
  }

  run().catch(e => console.error(`[kafka-consumer] ${e.message}`, e))

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

  errorTypes.map(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await consumer.disconnect()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })

  signalTraps.map(type => {
    process.once(type, async () => {
      try {
        await consumer.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })
};

module.exports = {
  run: consumeMessages
};