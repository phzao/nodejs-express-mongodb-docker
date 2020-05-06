'use stricts';

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');

const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);
console.log('connection', config.connectionString);
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoute = require('./routes/index-route');
const productRoutes = require('./routes/product-route');
const customerRoutes = require('./routes/customer-route');
const orderRoutes = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

module.exports = app;