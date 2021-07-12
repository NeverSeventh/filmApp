const express = require('express');
const app = express();
const logger = require('morgan');

const userRouter = require('./routes/userRouter');
const filmRouter = require('./routes/filmRouter');
const adminRouter = require('./routes/adminRouter');
const cors = require('cors');
const authenticateToken = require('./middlewares/tokenVerify');





 app.use(cors());




app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(logger('dev'));
app.use(authenticateToken)




app.use('/',(req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



app.use('/user', userRouter);
app.use('/film', filmRouter);
app.use('/admin',adminRouter);

app.get('/',(req,res)=>{
    
})

app.listen(process.env.PORT || 6970,()=>{
    console.log('Server Started');
});