const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const corsm = require('./middleware/cors');
const rateLimiter = require('./middleware/limiter');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const auth = require('./middleware/auth');
const checkAssignedServer = require('./middleware/checkAssignedServer');
const domainRoutes = require('./routes/domainRoutes');
const groupRoutes = require('./routes/groupRoutes');
const clientRoutes = require('./routes/clientRoutes');
const auditRoutes = require('./routes/auditRoutes');
const piHoleRoutes = require('./routes/piHoleRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(corsm);
app.use(rateLimiter);

app.use(auth);
app.use(checkAssignedServer);

app.use('/domains', domainRoutes);
app.use('/groups', groupRoutes);
app.use('/clients', clientRoutes);
app.use('/audit', auditRoutes);
app.use('/pi-hole', piHoleRoutes);
app.use('/settings', settingsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`GarageIT App Server is running on port ${process.env.PORT}.`);
});

module.exports = app;