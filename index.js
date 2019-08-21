require('dotenv').config();
const express       = require('express');
const app           = express();
const helmet        = require('helmet');
const CORS          = require('cors');
const auth_router   = require('./auth_router');
const userInfo_router = require('./userInfo_router');
const { isLoggedIn } = require('./auth_middleware');
const PORT          = process.env.PORT || 3000;


app.use(helmet());
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', auth_router)
app.use('/api/auth/:id', isLoggedIn, userInfo_router)

// ====== ERROR HANDLERS =======
app.use((req, res, next) => {
    let err = new Error("NOT FOUND");
    err.status = 400;
    return next(err)
});

app.use((err, req, res, next) => {
    res.status( err.status || 500).json({
        message: err.message || "SOMETHING WENT WRONG"
    });
});

app.listen(PORT, () => console.log( `Auth service is now up and running on ${PORT}` ));

