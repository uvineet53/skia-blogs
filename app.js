const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const { result } = require('lodash');
const blogRoutes=require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI='mongodb+srv://admin:test1234@cluster0.rhtoe.mongodb.net/Nodejs?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');

//middleware static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

//routes
app.get('/',(req,res)=>{
   res.redirect('/blogs');
})
app.get('/about',(req,res)=>{
   // res.send('<p>About</p>');
res.render('about',{title:"About Us"});
})

//blog routes
app.use('/blogs',blogRoutes);

//404
app.use((req,res)=>{
    res.status(404).render('404',{title:"404"});
});