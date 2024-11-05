import express, { urlencoded } from 'express';
import 'dotenv/config';
import { Request, Response, Application } from 'express';    
import cors from 'cors';
import userRouter from './routes/userRoutes';
import pool from './db/database';

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): any => {
    res.send('Welcome to our node and postgres API');
});

const startServer = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully");
        client.release(); // Release the client back to the pool

        app.use('/api', userRouter); // uses the userRouter globally in the application
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to the database", error);
    }
}

startServer();
