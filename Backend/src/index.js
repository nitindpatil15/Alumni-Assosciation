import { config } from 'dotenv';
import connectDb from './Db/index.js';
import { PORT } from './constant.js';
import { app,server } from './app.js';

// Load environment variables from .env file
config({
    path: './env'
});


// Connect to MongoDB using the `connectDb` function
connectDb()
    .then(() => {
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
