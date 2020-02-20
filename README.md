# Kafka-NodeJS-Examples
Node JS Examples

### Prerequisites
- Have nodeJs and npm installed.
- To get **binary** distribution of Kafka from [here](https://kafka.apache.org/downloads) .

### Setup
Extract the contents of the kafka archive to a convenient place and `cd` into it. Use a terminal

#### Zookeeper
- Start the zookeeper instance with
`$ bin/zookeeper-server-start.sh config/zookeeper.properties`

#### Kafka brokers
 - In the `config` folder there would be a `server.properties` file. This is the kafka server's config file. We need 3 instances of kafka brokers.
  - Run the  brokers like
```
$  bin/kafka-server-start.sh config/server.properties
```

##### Testing out the install
- Create a topic with
`$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic <topic-name>`
 - Push data onto it
 `$ bin/kafka-console-producer.sh --broker-list localhost:9092 --sync --topic <topic-name>`

# Program Setup

To start the application in development mode
Install node modules on root of project,
```
npm install

Then,
```
npm start
```
