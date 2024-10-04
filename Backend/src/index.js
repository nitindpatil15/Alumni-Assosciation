import http from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import connectDb from './Db/index.js';
import { PORT } from './constant.js';
import { app } from './app.js';
import { Chat } from './Models/Chat.js';

// Load environment variables from .env file
config({
    path: './env'
});

// Set up Express app and HTTP server
const server = http.createServer(app);
const io = new Server(server);
console.log(io)

// Connect to MongoDB using the `connectDb` function
connectDb()
    .then(() => {
        console.log('MongoDB connected successfully!');

        // Set up Socket.io connection
        io.on('connection', (socket) => {
            console.log('A user connected');

            // Listen for chat messages
            socket.on('sendMessage', async ({ sender, receiver, message }) => {
                // Save message to the database
                const chat = new Chat({ sender, receiver, message });
                await chat.save();

                // Emit the message to the receiver
                socket.broadcast.emit('receiveMessage', { sender, message });
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });

        // Handle server errors
        app.on('error', (error) => {
            console.error('Server Error:', error);
        });

        // Start the server on the specified port
        server.listen(PORT || 8043, () => {
            console.log(`Server is running at http://localhost:${PORT || 8043}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection Failed !!!', err);
    });
