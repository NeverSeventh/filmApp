const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const sessions = require('express-session');
const userRouter = require('./routes/userRouter');
const filmRouter = require('./routes/filmRouter');
const adminRouter = require('./routes/adminRouter');
const FileStore = require('session-file-store')(sessions);
const cors = require('cors');





 app.use(cors());




app.use(express.urlencoded({extended:true}));
app.use(express.json());
const secretKey = require('crypto').randomBytes(64).toString('hex');
app.set('cookieName','userSession');
app.use(sessions({
    name:app.get('cookieName'),
    secret:secretKey,
    resave:false,
    saveUninitialized:false,
    store:new FileStore({secret:secretKey}),
    cookie:{
        httpOnly:true,
        maxAge:86400*1e3
    }


}));

app.use(logger('dev'));



app.use((req,res,next)=>{
    const userId=req.session?.user?.id;
    const role = req.session?.user?.role;
    return(next());
})

app.use(async(req,res,next)=>{
    res.locals.id= req.session?.user?.id;
    if(req.session?.user?.role ==='admin') {
        res.locals.admin = true;
    }
    next();
})

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

app.listen(6970,()=>{
    console.log('Server Started');
});