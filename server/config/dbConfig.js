const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN_STR);

const db = mongoose.connection;

db.on('connected' , ()=>{
    console.log('MongoDB Connected Successfully')
})
db.on('disconnected' , ()=>{
    console.log('MongoDB disconnected')
})

module.exports = db;