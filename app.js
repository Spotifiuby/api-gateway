const createError = require('http-errors');
const express = require('express');
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {ROUTES} = require("./routes/routes");
const {setupRateLimit} = require("./ratelimit/ratelimit");
const {setupProxies} = require("./proxy");

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/*// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.listen(port, () => {
  logger(`Server app listening at http://localhost:${port}`)
})
