import * as bodyParser from 'body-parser';
import { get as getConfig } from 'config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import { v4 } from 'public-ip';

// init db
import { mongooseConnectionPromise, mongoose } from './db.init';
export { mongoose, mongooseConnectionPromise }; // exporting for quick access in tests

mongooseConnectionPromise
  .then(() => {
    // tslint:disable-next-line
    // console.log('Mongoose connected to ');
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    // tslint:disable-next-line
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err,
    );
  });

import { AppEmailTemplates, sendEmail } from './email/send-email';
import { RequestError, RequestErrorType } from './error-handler/RequestError';

import { apis } from './routes/index';

import { getRoute } from './utils/get-route';

// import { accessControl } from './access-control/access-control';
import { attachTokenData } from './access-control/attach-token-data';

export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    origin: '*',
  }),
);

// un-comment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (getConfig('app.morgan')) {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', attachTokenData, apis);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new RequestError(RequestErrorType.NOT_FOUND);
  next(err);
});

const ERR_EMAIL: string = getConfig('mails.errMails');

// error handler
const requestErrHandler: express.ErrorRequestHandler = (
  err: RequestError,
  req,
  res,
  next,
) => {
  if (err.statusCode >= 500) {
    // stdout to log
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); // tslint:disable-line
    console.log(err); // tslint:disable-line
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); // tslint:disable-line
  }
  if (err.statusCode >= 500 && process.env.NODE_ENV !== 'development') {
    const route = getRoute(req);
    const queryOrParam = Object.keys(req.query).length ? '(Query)' : '(Param)';

    v4()
      .then(pubIp => {
        const mailOptions = {
          toAddresses: [ERR_EMAIL],
          template: AppEmailTemplates.ERR_REPORTER,
          fromName: 'Miwago Err Reporter',
          subject: `err ${err.statusCode} in ${process.env.USER ||
            'unknown-env'} in ${req.method} ${route} ${queryOrParam}`,
          fields: {
            errCode: err.statusCode,
            ENV_USER: process.env.USER,
            NODE_ENV: process.env.NODE_ENV,
            NODE_CONFIG: JSON.stringify(
              JSON.parse(process.env.NODE_CONFIG || '{}'),
              null,
              2,
            ),
            host: pubIp,
            NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE,
            databaseName: getConfig('database.url'),
            databaseHost: '',
            time: new Date(),
            requestOrigin: req.hostname,
            requestedUrl: req.originalUrl,
            errDetails: JSON.stringify(
              {
                code: err.statusCode,
                msg: err.message,
                details: err.details,
              },
              null,
              2,
            ),
            requestIp: req.ip,
            resLocals: JSON.stringify(res.locals, null, 2),
            reqMethod: req.method,
            reqHeaders: JSON.stringify(req.headers, null, 2),
            reqBody: JSON.stringify(req.body, null, 2),
            reqQuery: JSON.stringify(req.query, null, 2),
          },
        };
        console.log(mailOptions); // tslint:disable-line

        return sendEmail(mailOptions);
      })
      .then(data => console.log('err emailed. resp if any:', data)) // tslint:disable-line
      .catch(sendEmailErr => {
        // tslint:disable-next-line
        console.trace('err in sending err-responder-email', sendEmailErr);
      });
  }

  if (req.xhr) {
    // remove sensitive err details
    if (err.statusCode >= 500) {
      return res.status(err.statusCode).send({
        status: 'failed',
        message: err.message,
        statusCode: err.statusCode,
        remarks: 'This incident has reported.',
      });
    } else {
      return res.status(err.statusCode).send(err);
    }
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.statusCode);
  res.render('error');
};

app.use(requestErrHandler);
