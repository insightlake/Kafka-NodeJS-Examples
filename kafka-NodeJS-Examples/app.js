
const kafka = require('kafka-node'); //
const config = require('./config');

console.log('<---- Kafka Consumer started ---->')

try {
  const Consumer = kafka.Consumer;
  // Configure kafka client with host
  const client = new kafka.KafkaClient({ kafkaHost: config.kafka_host });
  // initialize consumer with basic properties
  let consumer = new Consumer(
    client,
    [{ topic: config.kafka_topic, partitions: 1 }],
    {
      autoCommit: true, // Auto commit config use for enable.auto.commit , default set as true
      fetchMaxWaitMs: 1000, // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100m
      fetchMaxBytes: 1024 * 1024,  // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
      encoding: 'utf8', // If set to 'buffer', values will be returned as raw buffer objects.
      fromOffset: true  //if true, the consumer will fetch message from the specified offset, otherwise it will fetch message from the last commited offset of the topic.
    }
  );
  // Function callback when new message comes
  consumer.on('message', async function (message) {
    console.log('message--> ', message.value);
  })
  // Function callback when error comes
  consumer.on('error', function (err) {
    console.log('error-->', err);
  });
} catch (e) {
  console.log('exception-->', e);
}

