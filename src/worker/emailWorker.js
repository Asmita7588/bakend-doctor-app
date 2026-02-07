import amqp from 'amqplib';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asmitagirhepunje@gmail.com',
        pass: 'txnu nwzw qiri dipx'
    }
});

export const startWorker = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('email_queue', { durable: true });

    console.log("Waiting for messages in email_queue...");

    channel.consume('email_queue', async (msg) => {
        if (msg !== null) {
            const { email, otp } = JSON.parse(msg.content.toString());

            try {
              //mail sending start here
                await transporter.sendMail({
                    from: '"Clinic System" asmitagirhepunje@gmail.com',
                    to: email,
                    subject: "Your Verification Code",
                    text: `Your OTP is: ${otp}. It expires in 10 minutes.`
                });

                console.log(`Email sent to ${email}`);
                channel.ack(msg); 
            } catch (error) {
                console.error("Failed to send email:", error);
            }
        }
    });
};
