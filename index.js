const express = require('express');
const cookieParser=require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db =require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const MongoStore=require('connect-mongo')(session);
const sassMilddleware=require('node-sass-middleware');

app.use(sassMilddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());



app.use(express.static('./assets'));
app.use(expressLayouts);


app.set('layout extractStyles',true);
// done ek silly mistake thi ./ hota hai naki /. okay acha cookie parser ko run kaise kre cookie parser run nahi hotah hai voh ek 
// token generate krta hai jab user login krta hai toh..token genearate ??u

app.set('layout extractScripts',true);




app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name:'codeial',
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)

    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});