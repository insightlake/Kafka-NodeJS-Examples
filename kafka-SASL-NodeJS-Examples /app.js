const { Kafka } = require('kafkajs')
const config = require('./config');
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [config.kafka_host],
  ssl: true,
  sasl: {
    mechanism: 'PLAIN',
    username: config.sasl_username,
    password: config.sasl_password
  }
})

// const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test' + getRandomInt() })
// for creating Random group ID
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(100));
}

const run = async () => {

  // Producing for testing purpose 
  // await producer.connect()
  // await producer.send({
  //   topic: 'edp-node',
  //   messages: [
  //     { value: 'Hello KafkaJS user!' },
  //   ],
  // })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: config.kafka_topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('message=>>', JSON.stringify({ partition, offset: message.offset, value: message.value.toString() }, null, 2))
    }
  })
}
run().catch(console.error)