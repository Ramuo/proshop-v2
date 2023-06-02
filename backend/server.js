import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


const port = process.env.PORT || 5000;

//CONNECT TO MongoDB
connectDB();

//INITIALIZE EXPRESS
const app = express();

// Bordy parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parsr middleware
app.use(cookieParser());


//ROUTES
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//PAYPAL ROUTE
app.get('/api/config/paypal', (req, res) => res.send({clientId: 
process.env.PAYPAL_CLIENT_ID}));


// STATIC ROUTE
const __dirname = path.resolve(); //Set __dir to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

//SERVER
app.listen(port, () => console.log(`Server running on port ${port}`));