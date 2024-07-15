const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./db');
const auth = require('./middleware/auth');

const userRoutes = require('./routes/userRoutes');
const domainRoutes = require('./routes/domainRoutes');
const groupRoutes = require('./routes/groupRoutes');
const clientRoutes = require('./routes/clientRoutes');
const auditRoutes = require('./routes/auditRoutes');
const piHoleRoutes = require('./routes/piHoleRoutes');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use(auth);
app.use('/domains', domainRoutes);
app.use('/groups', groupRoutes);
app.use('/clients', clientRoutes);
app.use('/audit', auditRoutes);
app.use('/pi-hole', piHoleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running properly.`);
});
