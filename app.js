const createError = require('http-errors');
const express = require('express');
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {ROUTES} = require("./routes/routes");
const env        = require('dotenv');

const path = require("path");
env.config({ path: path.resolve(__dirname, process.env.NODE_ENV !== 'production' ? '.env.local' : '.env') });

const {setupRateLimit} = require("./ratelimit/ratelimit");
const {setupProxies} = require("./proxy");
const {setupAuth} = require("./auth/auth")

const app = express();

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

setupAuth(app, ROUTES);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  logger(`Server app listening at http://localhost:${port}`)
})
