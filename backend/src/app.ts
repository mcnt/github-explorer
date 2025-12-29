import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import githubRoutes from './routes/github.routes';
import { errorMiddleware } from './middlewares/error.middleware';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/github', githubRoutes);

app.use(errorMiddleware);

export default app;
