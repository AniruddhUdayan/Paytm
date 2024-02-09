const express = require("express");
const rootRouter = require('./routes/index')
var cors = require('cors')
const passport = require('passport');
const authRouter = require('./routes/auth')
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'your secret key', // Replace 'your secret key' with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // Example cookie settings
  }));
app.use(session({ }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.json());


app.use('/api/v1',rootRouter);
app.use('/auth',authRouter)

app.listen(3001)

 


