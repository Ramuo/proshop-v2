import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';


const port = process.env.PORT || 5000;

//CONNECT TO MongoDB
connectDB();

//INITIALIZE EXPRESS
const app = express();

// Bordy parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//ROUTES
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

//SERVER
app.listen(port, () => console.log(`Server running on port ${port}`));