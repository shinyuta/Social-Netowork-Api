const { connection, connect } = require('mongoose');
const stringConnection = process.env.MONGODB_URI || ''

connect(stringConnection);

module.exports=connection;