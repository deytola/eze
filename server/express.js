/* eslint-disable no-underscore-dangle */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compress from 'compression';
import morgan from 'morgan';
import tradeRequestRoutes from './routes/traderequest.routes';
import buyRequestRoutes from './routes/buyrequest.routes';
import sellRequestRoutes from './routes/sellrequest.routes';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

global.__basedir = path.join(__dirname, '/..');
app.set('view engine', 'ejs');
app.set('views', path.join(CURRENT_WORKING_DIR, 'server/views'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors({ optionsSuccessStatus: 200 }));

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', buyRequestRoutes);
app.use('/', sellRequestRoutes);
app.use('/', tradeRequestRoutes);

app.get('*', (req, res) => {
  res.render('pages/index');
});

app.use((err, req, res) => {
  if (err) {
    res.status(400).json({
      error: `${err.name} : ${err.message}`,
    });
  }
});

export default app;
