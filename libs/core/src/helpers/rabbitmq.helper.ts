import 'dotenv/config';
import { connect, Connection, ConsumeMessage } from 'amqplib';
import { sleep } from './common.helper';

export class RabbitMqHelper {
  private static connections = new Map<string, Connection>();

  static async createConnection(connectionName: string): Promise<Connection> {
    if (this.connections.has(connectionName)) {
      return this.connections.get(connectionName);
    }
    const connection = await connect({
      hostname: process.env.RABBITMQ_HOST,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      heartbeat: 30,
    });
    this.connections.set(connectionName, connection);
    return connection;
  }

  static async initializeListener(
    connection: Connection,
    queueName: string,
    exchange: string,
    routingKeys: [string],
    onMessage: (msg: any) => Promise<void>,
    _prefetchCount = 1,
  ): Promise<void> {
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'direct');
    await channel.assertQueue(queueName, { durable: true });
    for (const e of routingKeys) {
      channel.bindQueue(queueName, exchange, e);
    }

    await channel.prefetch(_prefetchCount, false);
    await channel.consume(queueName, async (msg: ConsumeMessage) => {
      try {
        await onMessage(JSON.parse(msg.content.toString()));
      } catch (e) {
        console.error(e);
        await sleep(500);
        channel.nack(msg, null, true);
      }
    });
  }

  static async publish(
    connectionName: string,
    msg: any,
    exchange: string,
    routingKey: string,
  ): Promise<void> {
    const connection = this.connections.get(connectionName);
    const channel = await connection.createChannel();
    const serializedMessage = Buffer.from(JSON.stringify(msg));
    channel.publish(exchange, routingKey, serializedMessage);
  }
}
