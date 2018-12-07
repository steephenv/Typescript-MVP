"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const config_1 = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const lme = require("lme");
const favicon = require("serve-favicon");
const root_access_1 = require("./access-control/root-access");
// import { workerHandler } from './routes/background-worker-handling';
// import {RequestError, RequestErrorType} from 'issue-maker/dist/src/error-types/express-request-error';
// init db
const db_init_1 = require("./db.init");
exports.mongooseConnectionPromise = db_init_1.mongooseConnectionPromise;
exports.mongoose = db_init_1.mongoose;
db_init_1.mongooseConnectionPromise
    .then(() => {
    lme.i(`> database connected:${config_1.get('database.url')}`);
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    // if this is a forked process, notify parent when the server is ready
    if (process.send) {
        lme.i('sending ready');
        process.send({ msg: 'ready' });
        process.on('message', msg => {
            if (typeof msg === 'object' && msg.msg === 'terminate') {
                console.log('terminating server upon parent request. bye :)'); // tslint:disable-line:no-console
                process.exit(msg.statusCode);
            }
        });
    }
})
    .catch(err => {
    // tslint:disable-next-line
    lme.e('> MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
const routes_1 = require("./routes");
const graphql_compiler_1 = require("./graphql-compiler");
// import { getRoute } from './utils/get-route';
// import { accessControl } from './access-control/access-control';
const attach_token_data_1 = require("./access-control/attach-token-data");
exports.app = express();
const morganEnabled = config_1.get('app.morgan');
// view engine setup
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'ejs');
exports.app.use(cors({
    origin: '*',
}));
// un-comment after placing your favicon in /public
exports.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// root files. this need to set acl only for devs
exports.app.use('/root', root_access_1.rootAccess, express.static(path.join(__dirname, 'root')));
if (morganEnabled) {
    exports.app.use(logger('dev'));
}
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, './public/frondend')));
exports.app.use('/v1', attach_token_data_1.attachTokenData, routes_1.apis);
exports.app.use('/graph', (req, res) => res.redirect('/v1/graph'));
exports.app.use('/v1/graph', attach_token_data_1.attachTokenData, graphql_compiler_1.buildGraphQLRoutesGateway());
// worker status
// app.use('/bw', workerHandler);
// test for err emails
// app.get('/send/cats/to/me/with/500', (req, res, next) =>
//   next(
//     new ExpressRequestError(
//       ExpressRequestErrorType.INTERNAL_SERVER_ERROR,
//       new Error('testing 500 with cats api'),
//     ),
//   ),
// );
// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new ExpressRequestError(ExpressRequestErrorType.NOT_FOUND);
//   next(err);
// });
// const gitlabIssue = new IssueMaker({
//   service: getConfig('issue-maker.service'),
//   endPoint: getConfig('issue-maker.endPoint'),
//   privateToken: getConfig('issue-maker.privateToken'),
//   projectId: getConfig('issue-maker.projectId'),
// });
// error handler
const requestErrHandler = (err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (err.statusCode >= 500) {
        // stdout to log
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); // tslint:disable-line
        console.log(err); // tslint:disable-line
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'); // tslint:disable-line
    }
    if (err.statusCode >= 500 &&
        process.env.NODE_ENV !== 'development' &&
        process.env.TESTING !== 'true') {
        try {
            // await gitlabIssue.expressReportError(req, err, {
            //   labels: 'by-issue-maker',
            //   resLocals: res.locals,
            //   databaseHost: getConfig('database.url'),
            //   databaseName: '',
            // });
        }
        catch (err) {
            console.log('ERR: some error occurred while reporting issue', err); //tslint:disable-line
        }
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
        }
        else {
            return res.status(err.statusCode).send(err);
        }
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.statusCode);
    res.render('error');
});
exports.app.use(requestErrHandler);
