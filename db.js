const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connected to DB successfully.');
    } catch (err) {
        console.error('Failed connecting to DB: ', err);
        process.exit(1);
    }
};

module.exports = connectDB;