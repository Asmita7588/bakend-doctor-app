/* eslint-disable no-undef */
import amqp from 'amqplib';

let channel = null; 

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('email_queue', { durable: true });
        console.log(" RabbitMQ Channel Created Successfully");
    } catch (error) {
        console.error(" RabbitMQ Connection Failed:", error);
        process.exit(1); 
    }
};

export const sendToQueue = (queue, data) => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized. Check your connection logic.");
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
};