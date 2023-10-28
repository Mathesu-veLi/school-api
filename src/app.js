import dotenv from 'dotenv';
import express from 'express';
import {resolve} from 'path';
//import cors from 'cors';
//import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import photoRoutes from './routes/photoRoutes';

dotenv.config();

import './database';

const corsOptions = {
  origin: function(origin, callback) {
    if(!origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //this.app.use(cors(corsOptions));
    //this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/photos', photoRoutes);
  }
}

export default new App().app;
