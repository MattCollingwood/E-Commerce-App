const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');
const app = express();
const authRoutes = require('./api/routes/auth');
const apiRouter = require('./api/api');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const flash = require('connect-flash');
const path = require('path');
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
require('./config/passport')(passport);
app.use(cors(corsOptions));

app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);

console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

// Middleware to set CSP headers
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' http://localhost:3000; connect-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; style-src 'self' 'unsafe-inline' http://localhost:3000; img-src 'self' data: http://localhost:3000; font-src 'self' data: http://localhost:3000; frame-src 'self' http://localhost:3000;");
  next();
});


app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: oneDay,
        sameSite: true,
        secure: false
    },
    store: db.sessionHandler(session)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
