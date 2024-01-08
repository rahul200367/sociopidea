const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const port = 3001;
app.use(express.json());
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(helmet());
app.use(cors());
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.get('/',(req,res)=>{
    res.send('working bro')
});
//mongodb setup
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>console.log('listening on port 3001'));
}).catch((err)=>console.log(`${err} did not connect`));
app.use('/auth',require('./Authorisatoin/auth'));
app.use('/users',require('./routes/users'));
app.use('/post',require('./routes/post'));