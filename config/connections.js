const { connect, connections } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connections;