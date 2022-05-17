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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(logger('combined'));
app.use(cookieParser());

setupAuth(app, ROUTES);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})
