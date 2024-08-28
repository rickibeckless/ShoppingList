import express from 'express';
import cors from 'cors';
import { userRoutes, listRoutes, itemRoutes } from './routes/data.js';
import connectionDB from './config/connections.js';


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/list', listRoutes);
app.use('/api/list/items', itemRoutes);

connectionDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});