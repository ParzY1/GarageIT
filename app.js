const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./db');
const corsm = require('./middleware/cors');
const rateLimiter = require('./middleware/limiter');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const userRoutes = require('./routes/userRoutes');
const auditRoutes = require('./routes/auditRoutes');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(corsm);
app.use(rateLimiter);

app.use('/users', userRoutes);
app.use('/audit', auditRoutes);

app.listen(process.env.PORT, () => {
    console.log(`GarageIT DB Server is running on port ${process.env.PORT}.`);
});

module.exports = app;
